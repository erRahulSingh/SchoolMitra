"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import * as LucideIcons from 'lucide-react';

export default function AdminCircularsPage() {
  const [circulars, setCirculars] = useState([
    { id: 1, title: 'Term 1 Exam Guidelines', audience: 'All Parents', date: '10 May 2024', status: 'Published' },
    { id: 2, title: 'Fee Structure Revision 2025', audience: 'All Parents', date: '05 May 2024', status: 'Published' }
  ]);
  
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    targetAudience: 'All Parents',
    attachmentUrl: ''
  });

  const handleSave = () => {
    // Call the POST /api/v1/communication/circulars
    alert(`Circular Published Successfully`);
    setShowForm(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <LucideIcons.FileText className="w-6 h-6 text-indigo-600" />
            </div>
            Circulars Manager
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Publish official school documents and circulars.</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6">
          <LucideIcons.UploadCloud className="w-4 h-4 mr-2" /> {showForm ? 'Cancel' : 'Upload Circular'}
        </Button>
      </div>

      {showForm && (
        <Card className="border-indigo-100 shadow-md animate-in fade-in slide-in-from-top-4">
          <CardHeader className="bg-indigo-50/50 border-b border-indigo-50">
            <CardTitle className="text-indigo-900 flex items-center gap-2">
              <LucideIcons.FileEdit size={18} /> Compose Circular
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 grid grid-cols-2 gap-6">
            
            <div className="space-y-2 col-span-2">
              <Label>Circular Title</Label>
              <Input placeholder="e.g. Revised Winter Timings" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>

            <div className="space-y-2 col-span-2 sm:col-span-1">
              <Label>Target Audience</Label>
              <select 
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                value={formData.targetAudience}
                onChange={e => setFormData({...formData, targetAudience: e.target.value})}
              >
                <option>All Parents</option>
                <option>All Teachers</option>
                <option>Specific Class</option>
              </select>
            </div>
            
            <div className="space-y-2 col-span-2 sm:col-span-1">
              <Label>Document URL / Drive Link</Label>
              <Input placeholder="https://..." value={formData.attachmentUrl} onChange={e => setFormData({...formData, attachmentUrl: e.target.value})} />
            </div>

            <div className="space-y-2 col-span-2">
              <Label>Description</Label>
              <Textarea placeholder="Brief description of the circular..." rows={3} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
            </div>

            <div className="col-span-2 flex justify-end mt-4">
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white px-8">
                <LucideIcons.CheckCircle size={16} className="mr-2" /> Publish Circular
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
                <th className="px-6 py-4 border-b border-slate-200">Circular Title</th>
                <th className="px-6 py-4 border-b border-slate-200">Audience</th>
                <th className="px-6 py-4 border-b border-slate-200">Date Published</th>
                <th className="px-6 py-4 border-b border-slate-200">Status</th>
                <th className="px-6 py-4 border-b border-slate-200 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {circulars.map(item => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 border-b border-slate-100 font-bold text-slate-800 flex items-center gap-3">
                    <LucideIcons.FileText className="text-blue-500" size={18} />
                    {item.title}
                  </td>
                  <td className="px-6 py-4 border-b border-slate-100 text-slate-600 font-semibold">{item.audience}</td>
                  <td className="px-6 py-4 border-b border-slate-100 text-slate-500 text-xs">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 border-b border-slate-100">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b border-slate-100 text-right">
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800 hover:bg-red-50">Delete</Button>
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
