"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { UploadCloud, FileText, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BulkUploadResultsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === "text/csv" || droppedFile.name.endsWith(".csv"))) {
      setFile(droppedFile);
      setError(null);
    } else {
      setError("Please upload a valid CSV file.");
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`/api/v1/exams/${id}/results/bulk-upload`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "x-school-id": localStorage.getItem("schoolId") || ""
        },
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.message || "Upload failed");
      }
    } catch (err) {
      setError("An error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/exams" className="text-gray-500 hover:text-gray-700 mr-4">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Bulk Upload Results (CSV)</h1>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600">
              Upload a CSV file containing student marks. Ensure the column headers match the exact subject names.
            </p>
            <a 
              href="/templates/results_template.csv" 
              className="text-blue-600 text-sm font-medium hover:underline flex items-center"
              download
            >
              <FileText className="w-4 h-4 mr-1" /> Download Template
            </a>
          </div>

          {!result ? (
            <div 
              onDragOver={(e) => e.preventDefault()} 
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${file ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
            >
              <UploadCloud className={`w-16 h-16 mx-auto mb-4 ${file ? 'text-blue-500' : 'text-gray-400'}`} />
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                {file ? file.name : "Drag & Drop CSV File here"}
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                or click to browse from your computer
              </p>
              <input 
                type="file" 
                accept=".csv" 
                className="hidden" 
                id="fileUpload" 
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) setFile(f);
                }}
              />
              <label 
                htmlFor="fileUpload"
                className="px-6 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 font-medium hover:bg-gray-50 cursor-pointer"
              >
                Browse Files
              </label>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
              <div className="flex items-center text-green-700 mb-4">
                <CheckCircle className="w-6 h-6 mr-2" />
                <h3 className="text-lg font-semibold">Upload Successful</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Total Rows</p>
                  <p className="text-2xl font-bold text-gray-800">{result.totalRows}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Processed</p>
                  <p className="text-2xl font-bold text-green-600">{result.successCount}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Failed</p>
                  <p className="text-2xl font-bold text-red-600">{result.failureCount}</p>
                </div>
              </div>
              {result.errors?.length > 0 && (
                <div className="mt-4">
                  <p className="font-medium text-red-600 mb-2">Errors Logs:</p>
                  <ul className="text-sm text-red-500 list-disc pl-5 max-h-40 overflow-y-auto">
                    {result.errors.map((err: any, idx: number) => (
                      <li key={idx}>Row {err.row}: {err.error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="mt-6 flex items-center text-red-600 bg-red-50 p-4 rounded-lg">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}

          {!result && (
            <div className="mt-8 flex justify-end">
              <button 
                disabled={!file || uploading}
                onClick={handleUpload}
                className={`px-8 py-3 rounded-lg font-medium text-white shadow-sm transition-colors ${!file || uploading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {uploading ? "Uploading..." : "Process Results"}
              </button>
            </div>
          )}
          
          {result && (
             <div className="mt-8 flex justify-end">
               <button onClick={() => router.push("/exams")} className="px-8 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900">
                 Done
               </button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
