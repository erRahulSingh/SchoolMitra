"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import * as LucideIcons from 'lucide-react';

export default function AdminStudyMaterialsPage() {
  const [materials, setMaterials] = useState([
    { id: 1, title: 'Term 1 Mathematics Syllabus', subject: 'Mathematics', class: 'Class 8-A', type: 'Syllabus', uploadedBy: 'Admin', date: '01 May 2024' },
    { id: 2, title: 'Photosynthesis PDF Notes', subject: 'Science', class: 'Class 8-A', type: 'Study Material', uploadedBy: 'Mrs. Neha', date: '05 May 2024' }
  ]);
  
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    classId: '',
    subjectId: '',
    type: 'Study Material',
    fileLink: ''
  });

  const handleSave = () => {
    // Call the POST /api/v1/study-materials
    alert(`${formData.type} Uploaded Successfully`);
    setShowForm(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <LucideIcons.BookOpen className="w-6 h-6 text-indigo-600" />
            </div>
            Syllabus & Study Materials
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Upload and manage syllabus, notes, and study links</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6">
          <LucideIcons.UploadCloud className="w-4 h-4 mr-2" /> {showForm ? 'Cancel' : 'Upload Material'}
        </Button>
      </div>

      {showForm && (
        <Card className="border-indigo-100 shadow-md animate-in fade-in slide-in-from-top-4">
          <CardHeader className="bg-indigo-50/50 border-b border-indigo-50">
            <CardTitle className="text-indigo-900">Upload New Material</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 grid grid-cols-2 gap-6">
            <div className="space-y-2 col-span-2 sm:col-span-1">
              <Label>Material Title</Label>
              <Input placeholder="e.g. Chapter 5 Physics Notes" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>

            <div className="space-y-2 col-span-2 sm:col-span-1">
              <Label>Type</Label>
              <select 
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
              >
                <option>Study Material</option>
                <option>Syllabus</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label>Class</Label>
              <select className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
                <option>Class 8 - A</option>
                <option>Class 9 - B</option>
                <option>Class 10 - A</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label>Subject</Label>
              <select className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
                <option>Mathematics</option>
                <option>Science</option>
                <option>English</option>
              </select>
            </div>

            <div className="space-y-2 col-span-2">
              <Label>File Link or URL</Label>
              <Input placeholder="https://drive.google.com/..." value={formData.fileLink} onChange={e => setFormData({...formData, fileLink: e.target.value})} />
            </div>

            <div className="space-y-2 col-span-2">
              <Label>Description (Optional)</Label>
              <Textarea placeholder="Brief description of the material..." rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            </div>

            <div className="col-span-2 flex justify-end">
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white px-8">
                Upload & Publish
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
                <th className="px-6 py-4 border-b border-slate-200">Title</th>
                <th className="px-6 py-4 border-b border-slate-200">Type</th>
                <th className="px-6 py-4 border-b border-slate-200">Class & Subject</th>
                <th className="px-6 py-4 border-b border-slate-200">Uploaded By</th>
                <th className="px-6 py-4 border-b border-slate-200">Date</th>
                <th className="px-6 py-4 border-b border-slate-200 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {materials.map(item => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 border-b border-slate-100 font-bold text-slate-800 flex items-center gap-3">
                    <LucideIcons.FileText className={item.type === 'Syllabus' ? 'text-amber-500' : 'text-blue-500'} size={18} />
                    {item.title}
                  </td>
                  <td className="px-6 py-4 border-b border-slate-100">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.type === 'Syllabus' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b border-slate-100 text-slate-600">
                    <div className="font-semibold">{item.class}</div>
                    <div className="text-xs text-slate-500">{item.subject}</div>
                  </td>
                  <td className="px-6 py-4 border-b border-slate-100 text-slate-600 font-medium">{item.uploadedBy}</td>
                  <td className="px-6 py-4 border-b border-slate-100 text-slate-500">{item.date}</td>
                  <td className="px-6 py-4 border-b border-slate-100 text-right">
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">Download</Button>
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
