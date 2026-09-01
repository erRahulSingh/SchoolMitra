"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import * as LucideIcons from 'lucide-react';

export default function AdminEventsPage() {
  const [events, setEvents] = useState([
    { id: 1, title: 'Annual Sports Day', date: '25 May 2025', audience: 'All', status: 'Published' },
    { id: 2, title: 'Summer Holidays Start', date: '01 Jun 2025', audience: 'All', status: 'Published' }
  ]);
  
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventType: 'Custom',
    startDate: '',
    endDate: '',
    targetAudience: 'All'
  });

  const handleSave = () => {
    // POST /api/v1/events
    alert(`Event Created Successfully`);
    setShowForm(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-pink-100 rounded-lg">
              <LucideIcons.Calendar className="w-6 h-6 text-pink-600" />
            </div>
            School Events & Calendar
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Manage school events, holidays, and calendar activities.</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-pink-600 hover:bg-pink-700 text-white font-bold px-6">
          <LucideIcons.Plus className="w-4 h-4 mr-2" /> {showForm ? 'Cancel' : 'Create Event'}
        </Button>
      </div>

      {showForm && (
        <Card className="border-pink-100 shadow-md animate-in fade-in slide-in-from-top-4">
          <CardHeader className="bg-pink-50/50 border-b border-pink-50">
            <CardTitle className="text-pink-900 flex items-center gap-2">
              <LucideIcons.CalendarPlus size={18} /> New Event Details
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 grid grid-cols-2 gap-6">
            
            <div className="space-y-2 col-span-2">
              <Label>Event Title</Label>
              <Input placeholder="e.g. Science Exhibition" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>

            <div className="space-y-2 col-span-2 sm:col-span-1">
              <Label>Start Date</Label>
              <Input type="date" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} />
            </div>
            
            <div className="space-y-2 col-span-2 sm:col-span-1">
              <Label>End Date</Label>
              <Input type="date" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} />
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

            <div className="space-y-2 col-span-2">
              <Label>Description</Label>
              <Textarea placeholder="Event details..." rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            </div>

            <div className="col-span-2 flex justify-end mt-4">
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white px-8">
                <LucideIcons.CheckCircle size={16} className="mr-2" /> Publish Event
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
                <th className="px-6 py-4 border-b border-slate-200">Event Title</th>
                <th className="px-6 py-4 border-b border-slate-200">Date</th>
                <th className="px-6 py-4 border-b border-slate-200">Audience</th>
                <th className="px-6 py-4 border-b border-slate-200">Status</th>
                <th className="px-6 py-4 border-b border-slate-200 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map(item => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 border-b border-slate-100 font-bold text-slate-800 flex items-center gap-3">
                    <LucideIcons.Calendar className="text-pink-500" size={18} />
                    {item.title}
                  </td>
                  <td className="px-6 py-4 border-b border-slate-100 text-slate-600 font-semibold">{item.date}</td>
                  <td className="px-6 py-4 border-b border-slate-100 text-slate-500 text-xs">
                    {item.audience}
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
