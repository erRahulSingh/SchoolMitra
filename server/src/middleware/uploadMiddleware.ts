import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(process.cwd(), "uploads", "csv");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  }
});

export const uploadCsv = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== ".csv" && ext !== ".xlsx") {
      return cb(new Error("Only CSV and Excel files are allowed"));
    }
    cb(null, true);
  }
});

const genericUpload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.m4a', '.mp3', '.wav', '.pdf', '.mp4', '.mov'];
    if (
      !allowedExtensions.includes(ext) && 
      !file.mimetype.startsWith('image/') && 
      !file.mimetype.startsWith('audio/') && 
      !file.mimetype.startsWith('video/')
    ) {
      return cb(new Error("Only Image, Audio, Video, and PDF files are allowed"));
    }
    cb(null, true);
  }
});

export default genericUpload;
