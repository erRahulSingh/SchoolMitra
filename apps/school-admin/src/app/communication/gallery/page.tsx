"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import * as LucideIcons from 'lucide-react';

export default function AdminGalleryPage() {
  const [albums, setAlbums] = useState([
    { id: 1, title: 'Annual Function 2024', photosCount: 24, date: '12 Dec 2024', status: 'Published' },
    { id: 2, title: 'Sports Meet', photosCount: 45, date: '10 Nov 2024', status: 'Published' }
  ]);
  
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventDate: '',
    coverPhotoUrl: ''
  });

  const handleSave = () => {
    // POST /api/v1/gallery/albums
    alert(`Gallery Album Created Successfully`);
    setShowForm(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <LucideIcons.Image className="w-6 h-6 text-purple-600" />
            </div>
            Gallery Manager
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Create photo albums and upload pictures from school events.</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6">
          <LucideIcons.Plus className="w-4 h-4 mr-2" /> {showForm ? 'Cancel' : 'Create Album'}
        </Button>
      </div>

      {showForm && (
        <Card className="border-purple-100 shadow-md animate-in fade-in slide-in-from-top-4">
          <CardHeader className="bg-purple-50/50 border-b border-purple-50">
            <CardTitle className="text-purple-900 flex items-center gap-2">
              <LucideIcons.FolderPlus size={18} /> New Album Details
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 grid grid-cols-2 gap-6">
            
            <div className="space-y-2 col-span-2">
              <Label>Album Title</Label>
              <Input placeholder="e.g. Science Exhibition 2025" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>

            <div className="space-y-2 col-span-2 sm:col-span-1">
              <Label>Event Date</Label>
              <Input type="date" value={formData.eventDate} onChange={e => setFormData({...formData, eventDate: e.target.value})} />
            </div>
            
            <div className="space-y-2 col-span-2 sm:col-span-1">
              <Label>Cover Photo (URL or File Upload)</Label>
              <Input type="file" accept="image/*" />
            </div>

            <div className="space-y-2 col-span-2">
              <Label>Description</Label>
              <Textarea placeholder="Brief description of the event..." rows={2} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            </div>

            <div className="col-span-2 flex justify-end mt-4">
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white px-8">
                <LucideIcons.CheckCircle size={16} className="mr-2" /> Save & Upload Photos
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
                <th className="px-6 py-4 border-b border-slate-200">Album Name</th>
                <th className="px-6 py-4 border-b border-slate-200">Date</th>
                <th className="px-6 py-4 border-b border-slate-200">Total Photos</th>
                <th className="px-6 py-4 border-b border-slate-200">Status</th>
                <th className="px-6 py-4 border-b border-slate-200 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {albums.map(item => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 border-b border-slate-100 font-bold text-slate-800 flex items-center gap-3">
                    <LucideIcons.Folder className="text-purple-500" size={18} />
                    {item.title}
                  </td>
                  <td className="px-6 py-4 border-b border-slate-100 text-slate-600 font-semibold">{item.date}</td>
                  <td className="px-6 py-4 border-b border-slate-100 text-slate-500 text-xs">
                    {item.photosCount} photos
                  </td>
                  <td className="px-6 py-4 border-b border-slate-100">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b border-slate-100 text-right">
                    <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-800 hover:bg-purple-50 mr-2">Manage Photos</Button>
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
