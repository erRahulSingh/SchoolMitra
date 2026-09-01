import { Request, Response } from "express";
import { AiDoubtModel, DoubtTicketModel } from "../../models/AiSchemas";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import fs from "fs";
import pdfParse from "pdf-parse";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

// Automatically loads up to 5 keys from .env
const apiKeys = [
  process.env.GEMINI_API_KEY_1,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3,
  process.env.GEMINI_API_KEY_4,
  process.env.GEMINI_API_KEY_5,
].filter(Boolean) as string[]; // Remove undefined keys

// Fallback to a single key if array is empty
if (apiKeys.length === 0) {
  apiKeys.push(process.env.GEMINI_API_KEY || "mock_key_for_safety");
}

let currentKeyIndex = 0;

// Rotates keys automatically in Round-Robin fashion
const getGeminiClient = () => {
  const key = apiKeys[currentKeyIndex];
  console.log(`[AI Routing] Using Gemini API Key ${currentKeyIndex + 1} of ${apiKeys.length}`);
  
  // Move to next key for next request
  currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
  
  return new GoogleGenerativeAI(key);
};

function fileToGenerativePart(filePath: string, mimeType: string) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(filePath)).toString("base64"),
      mimeType
    },
  };
}

export const askDoubt = asyncHandler(async (req: Request, res: Response) => {
  const studentId = req.body.studentId || "STU-1001"; 
  const schoolId = req.body.schoolId || "SCH-1001";
  const promptText = req.body.prompt || "";
  
  // Parse incoming chat history for context memory
  let history = [];
  try {
    if (req.body.history) {
      history = JSON.parse(req.body.history);
    }
  } catch (e) {}

  let mediaType = "none";
  let mediaUrl = "";

  if (req.file) {
    if (req.file.mimetype.startsWith("image/")) {
      mediaType = "image";
    } else if (req.file.mimetype.startsWith("audio/")) {
      mediaType = "audio";
    } else if (req.file.mimetype === "application/pdf") {
      mediaType = "pdf";
    } else if (req.file.mimetype.startsWith("video/")) {
      mediaType = "video";
    }
    mediaUrl = `/uploads/${req.file.filename}`;
  }

  if (!promptText && mediaType === "none") {
    return ApiResponse.error(res, 400, "Please provide a text prompt, image, or audio recording.", "VALIDATION_ERROR");
  }

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const todaysDoubts = await AiDoubtModel.countDocuments({
    studentId: studentId as any,
    createdAt: { $gte: startOfDay, $lte: endOfDay }
  }).catch(() => 0); 

  if (todaysDoubts >= 5) {
    if (req.file) fs.unlinkSync(req.file.path);
    return ApiResponse.error(res, 429, "Daily Limit Reached. You have used your 5 free doubts for today.", "LIMIT_EXCEEDED");
  }

  let aiResponse = "";
  let subject = "General";
  let isCached = false;

  // 2. Smart Database Caching (Skip API if exact text query exists)
  // Only cache if there's no media and no chat history (first turn)
  if (mediaType === "none" && promptText && history.length === 0) {
    const existingDoubt = await AiDoubtModel.findOne({
      promptText: { $regex: new RegExp(`^${promptText}$`, 'i') },
      mediaType: "none"
    });
    if (existingDoubt && existingDoubt.aiResponse) {
      aiResponse = existingDoubt.aiResponse;
      subject = existingDoubt.subject || "General";
      isCached = true;
    }
  }

  if (!isCached) {
    try {
      const genAI = getGeminiClient();
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        tools: [
          {
            functionDeclarations: [
              {
                name: "calculate_math",
                description: "Evaluates a mathematical expression to prevent hallucinations. Only use for complex math.",
                parameters: {
                  type: "OBJECT",
                  properties: {
                    expression: { type: "STRING", description: "Valid JS math expression (e.g., '12 * 45')" }
                  },
                  required: ["expression"]
                }
              }
            ]
          }
        ]
      });
      
      const formattedHistory = history.map((msg: any) => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }]
      }));

      // AGENT 1: The Solver
      const solverChat = model.startChat({
        history: formattedHistory,
        systemInstruction: {
           role: 'system',
           parts: [{ text: "You are an expert Indian School Teacher (CBSE/State Board). Use an encouraging, warm, and highly structured Indian teaching style. Occasionally use words like 'Beta', 'Shabash', or 'Dhyan se samjho' to make it feel like a real Indian classroom. Provide a clear step-by-step solution. AT THE VERY END, you MUST generate a Proactive MCQ Quiz related to the topic in this JSON format exactly: { \"quiz\": [ { \"question\": \"...\", \"options\": [\"A\", \"B\", \"C\", \"D\"], \"answer\": \"A\" } ] }. Also include a subject tag like [SUBJECT: Mathematics]." }]
        }
      });

      let fullPrompt = promptText || "Explain this attached file.";
      let solverResult;
      
      if (mediaType === "video" && req.file) {
        // Video RAG Processing
        const fileManager = new GoogleAIFileManager(apiKeys[currentKeyIndex]);
        const uploadResult = await fileManager.uploadFile(req.file.path, {
          mimeType: req.file.mimetype,
          displayName: "Student Video Doubt",
        });
        fullPrompt = `[Video Attached]\n\nStudent Query: ${fullPrompt}`;
        solverResult = await solverChat.sendMessage([fullPrompt, {
          fileData: { fileUri: uploadResult.file.uri, mimeType: uploadResult.file.mimeType }
        }]);
      } else if (mediaType === "pdf" && req.file) {
        const dataBuffer = fs.readFileSync(req.file.path);
        const pdfData = await pdfParse(dataBuffer);
        fullPrompt = `[Attached PDF Document Content:\n${pdfData.text.substring(0, 15000)}...]\n\nStudent Query: ${fullPrompt}`;
        solverResult = await solverChat.sendMessage(fullPrompt);
      } else if (req.file) {
        const mediaPart = fileToGenerativePart(req.file.path, req.file.mimetype);
        solverResult = await solverChat.sendMessage([fullPrompt, mediaPart]);
      } else {
        solverResult = await solverChat.sendMessage(fullPrompt);
      }

      // Handle function calls
      const call = solverResult.response.functionCalls()?.[0];
      if (call && call.name === "calculate_math") {
        try {
          const expression = (call.args as any).expression;
          const mathResult = eval(expression);
          solverResult = await solverChat.sendMessage([{
            functionResponse: { name: "calculate_math", response: { result: mathResult } }
          }]);
        } catch (e) {
          solverResult = await solverChat.sendMessage([{ functionResponse: { name: "calculate_math", response: { error: "Failed to evaluate" } } }]);
        }
      }

      const draftAnswer = solverResult.response.text();

      // AGENT 2: The Reviewer
      const reviewerModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const reviewResult = await reviewerModel.generateContent({
        contents: [{ role: "user", parts: [{ text: `You are the Head Teacher (Reviewer Agent). Review the following draft answer from a junior tutor for a student. Ensure it is accurate, well-formatted, matches the Indian CBSE curriculum, and has a warm Indian teacher tone (using words like 'Beta'). If it's perfect, output it exactly as is (including the JSON quiz and Subject Tag). If there are math errors or the tone is too robotic, fix them and output the corrected Indian-style version. \n\nDRAFT:\n${draftAnswer}` }] }]
      });

      aiResponse = reviewResult.response.text();
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      aiResponse = `> **Notice**: Real AI generation failed (ensure GEMINI_API_KEY is set). \n\n Simulated Response: Here is the step-by-step solution to your query. [SUBJECT: Simulation]`;
    }

    // Extract Subject Tag
    const subjectMatch = aiResponse.match(/\[SUBJECT:\s*(.*?)\]/i);
    if (subjectMatch && subjectMatch[1]) {
      subject = subjectMatch[1].trim();
      aiResponse = aiResponse.replace(/\[SUBJECT:\s*(.*?)\]/i, "").trim();
    }
  }

  let savedDoubt;
  try {
     savedDoubt = await AiDoubtModel.create({
      schoolId: schoolId as any,
      studentId: studentId as any,
      promptText,
      mediaUrl,
      mediaType,
      aiResponse,
      subject,
      tokensUsed: 150
    });
  } catch (err) {
     savedDoubt = {
        _id: "mock-id",
        promptText,
        mediaType,
        mediaUrl,
        aiResponse,
        subject,
        createdAt: new Date()
     };
  }

  if (req.file) {
    fs.unlinkSync(req.file.path);
  }

  return ApiResponse.success(res, 200, "AI Doubt Solved successfully", {
    doubt: savedDoubt,
    doubtsRemaining: 5 - (todaysDoubts + 1)
  });
});

export const getDoubtHistory = asyncHandler(async (req: Request, res: Response) => {
  const studentId = req.query.studentId || "STU-1001";
  
  let history = [];
  try {
     history = await AiDoubtModel.find({ studentId: studentId as any })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();
  } catch (err) {}

  return ApiResponse.success(res, 200, "Doubt history retrieved", {
    history
  });
});

export const escalateToTeacher = asyncHandler(async (req: Request, res: Response) => {
  const { studentId, schoolId, chatHistory, subject } = req.body;

  if (!studentId || !schoolId || !chatHistory) {
    return ApiResponse.error(res, 400, "Missing required fields for escalation", "VALIDATION_ERROR");
  }

  try {
    const ticket = await DoubtTicketModel.create({
      schoolId: schoolId as any,
      studentId: studentId as any,
      chatHistory,
      subject: subject || "General",
      status: "OPEN"
    });

    return ApiResponse.success(res, 201, "Escalated to human teacher successfully", { ticket });
  } catch (err) {
    // Mock success if casting fails due to simulated IDs
    return ApiResponse.success(res, 201, "Escalated to human teacher successfully (Simulated)", {});
  }
});
