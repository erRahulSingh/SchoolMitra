"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import * as LucideIcons from 'lucide-react';

export default function AdminExamsPage() {
  const [exams, setExams] = useState([
    { id: 'EXM-2026-MID', title: 'Mid-Term Examination 2026', class: '10', type: 'Half Yearly', status: 'Published' },
    { id: 'EXM-2026-UT1', title: 'Unit Test 1', class: '9', type: 'Unit Test', status: 'Draft' }
  ]);
  
  const [showUpload, setShowUpload] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const [uploadData, setUploadData] = useState({ classId: '10' });

  const handleUploadClick = (examId: string) => {
    setSelectedExamId(examId);
    setShowUpload(true);
  };

  const handleBulkUpload = () => {
    // POST /api/v1/exams/:id/results/bulk-upload
    alert(`CSV Results uploaded successfully for Class ${uploadData.classId}. Results are now dynamically available for parents.`);
    setShowUpload(false);
    setSelectedExamId(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <LucideIcons.Award className="w-6 h-6 text-emerald-600" />
            </div>
            Exams & Results Manager
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Manage examinations, upload CSV result sheets, and publish report cards.</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6">
          <LucideIcons.Plus className="w-4 h-4 mr-2" /> Create New Exam
        </Button>
      </div>

      {showUpload && selectedExamId && (
        <Card className="border-emerald-100 shadow-md animate-in fade-in slide-in-from-top-4">
          <CardHeader className="bg-emerald-50/50 border-b border-emerald-50">
            <CardTitle className="text-emerald-900 flex items-center gap-2">
              <LucideIcons.UploadCloud size={18} /> Bulk Upload Marks (CSV)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 grid grid-cols-2 gap-6">
            
            <div className="space-y-2 col-span-2 sm:col-span-1">
              <Label>Select Class</Label>
              <select 
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                value={uploadData.classId}
                onChange={e => setUploadData({...uploadData, classId: e.target.value})}
              >
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
            </div>

            <div className="space-y-2 col-span-2 sm:col-span-1">
              <Label>Upload CSV File</Label>
              <Input type="file" accept=".csv" />
              <p className="text-xs text-slate-500 mt-1">Columns: RollNo, Subject, Theory, Practical</p>
            </div>

            <div className="col-span-2 flex justify-end mt-4 gap-3">
              <Button onClick={() => setShowUpload(false)} variant="outline">Cancel</Button>
              <Button onClick={handleBulkUpload} className="bg-emerald-600 hover:bg-emerald-700 text-white px-8">
                <LucideIcons.CheckCircle size={16} className="mr-2" /> Upload & Publish
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-xs">
              <tr>
                <th className="px-6 py-4 border-b border-slate-200">Exam Title</th>
                <th className="px-6 py-4 border-b border-slate-200">Class</th>
                <th className="px-6 py-4 border-b border-slate-200">Type</th>
                <th className="px-6 py-4 border-b border-slate-200">Status</th>
                <th className="px-6 py-4 border-b border-slate-200 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {exams.map(item => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 border-b border-slate-100 font-bold text-slate-800 flex items-center gap-3">
                    <LucideIcons.FileText className="text-emerald-500" size={18} />
                    {item.title}
                  </td>
                  <td className="px-6 py-4 border-b border-slate-100 text-slate-600 font-semibold">{item.class}</td>
                  <td className="px-6 py-4 border-b border-slate-100 text-slate-500">
                    {item.type}
                  </td>
                  <td className="px-6 py-4 border-b border-slate-100">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b border-slate-100 text-right">
                    <Button onClick={() => handleUploadClick(item.id)} variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 mr-2">
                      <LucideIcons.Upload size={14} className="mr-1" /> Upload CSV
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
