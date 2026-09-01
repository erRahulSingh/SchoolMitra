"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import * as LucideIcons from 'lucide-react';

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState([
    { id: 1, title: 'Holiday on 15th May 2025', audience: 'All', date: '01 May 2024', status: 'Published' },
    { id: 2, title: 'PTM Schedule', audience: 'Parents', date: '05 May 2024', status: 'Published' }
  ]);
  
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    targetAudience: 'All',
    priority: 'Normal'
  });

  const handleSave = () => {
    // Call the POST /api/v1/communication/notices
    alert(`Notice Published Successfully`);
    setShowForm(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <LucideIcons.Megaphone className="w-6 h-6 text-indigo-600" />
            </div>
            Notice Board Manager
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Broadcast short announcements and notices instantly.</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6">
          <LucideIcons.Plus className="w-4 h-4 mr-2" /> {showForm ? 'Cancel' : 'Create Notice'}
        </Button>
      </div>

      {showForm && (
        <Card className="border-indigo-100 shadow-md animate-in fade-in slide-in-from-top-4">
          <CardHeader className="bg-indigo-50/50 border-b border-indigo-50">
            <CardTitle className="text-indigo-900 flex items-center gap-2">
              <LucideIcons.Settings size={18} /> Compose Notice
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 grid grid-cols-2 gap-6">
            
            <div className="space-y-2 col-span-2">
              <Label>Notice Title</Label>
              <Input placeholder="e.g. Annual Sports Day Announcement" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>

            <div className="space-y-2 col-span-2 sm:col-span-1">
              <Label>Target Audience</Label>
              <select 
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                value={formData.targetAudience}
                onChange={e => setFormData({...formData, targetAudience: e.target.value})}
              >
                <option>All</option>
                <option>Parents</option>
                <option>Teachers</option>
                <option>Students</option>
              </select>
            </div>
            
            <div className="space-y-2 col-span-2 sm:col-span-1">
              <Label>Priority</Label>
              <select 
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                value={formData.priority}
                onChange={e => setFormData({...formData, priority: e.target.value})}
              >
                <option>Normal</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>

            <div className="space-y-2 col-span-2">
              <Label>Notice Content</Label>
              <Textarea placeholder="Type your full announcement here..." rows={4} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
            </div>

            <div className="col-span-2 flex justify-end mt-4">
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white px-8">
                <LucideIcons.CheckCircle size={16} className="mr-2" /> Publish Notice
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
                <th className="px-6 py-4 border-b border-slate-200">Notice Title</th>
                <th className="px-6 py-4 border-b border-slate-200">Audience</th>
                <th className="px-6 py-4 border-b border-slate-200">Date Published</th>
                <th className="px-6 py-4 border-b border-slate-200">Status</th>
                <th className="px-6 py-4 border-b border-slate-200 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {notices.map(item => (
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
