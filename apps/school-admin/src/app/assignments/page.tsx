"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import * as LucideIcons from 'lucide-react';

export default function AdminAssignmentsPage() {
  const [assignments, setAssignments] = useState([
    { id: 1, title: 'Algebra Equations', subject: 'Mathematics', class: 'Class 8-A', teacher: 'Mr. Rajesh', dueDate: '25 May 2024', status: 'Active' },
    { id: 2, title: 'Photosynthesis Essay', subject: 'Science', class: 'Class 8-A', teacher: 'Mrs. Neha', dueDate: '28 May 2024', status: 'Active' }
  ]);
  
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    classId: '',
    subjectId: '',
    maxMarks: '10',
    dueDate: ''
  });

  const handleSave = () => {
    // Call the POST /api/v1/assignments
    alert("Assignment Published Successfully");
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
            Assignments Manager
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Manage and publish assignments for all classes</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6">
          <LucideIcons.Plus className="w-4 h-4 mr-2" /> {showForm ? 'Cancel' : 'Create Assignment'}
        </Button>
      </div>

      {showForm && (
        <Card className="border-indigo-100 shadow-md">
          <CardHeader className="bg-indigo-50/50 border-b border-indigo-50">
            <CardTitle className="text-indigo-900">Create New Assignment</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 grid grid-cols-2 gap-6">
            <div className="space-y-2 col-span-2">
              <Label>Assignment Title</Label>
              <Input placeholder="e.g. Chapter 5 Homework" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>
            
            <div className="space-y-2">
              <Label>Class & Section</Label>
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

            <div className="space-y-2">
              <Label>Due Date</Label>
              <Input type="date" value={formData.dueDate} onChange={e => setFormData({...formData, dueDate: e.target.value})} />
            </div>

            <div className="space-y-2">
              <Label>Max Marks</Label>
              <Input type="number" value={formData.maxMarks} onChange={e => setFormData({...formData, maxMarks: e.target.value})} />
            </div>

            <div className="space-y-2 col-span-2">
              <Label>Description / Instructions</Label>
              <Textarea placeholder="Instructions for the students..." rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            </div>

            <div className="col-span-2 flex justify-end">
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white px-8">
                Publish Assignment
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
                <th className="px-6 py-4 border-b border-slate-200">Subject</th>
                <th className="px-6 py-4 border-b border-slate-200">Class</th>
                <th className="px-6 py-4 border-b border-slate-200">Teacher</th>
                <th className="px-6 py-4 border-b border-slate-200">Due Date</th>
                <th className="px-6 py-4 border-b border-slate-200 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map(item => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 border-b border-slate-100 font-bold text-slate-800">{item.title}</td>
                  <td className="px-6 py-4 border-b border-slate-100 text-slate-600">{item.subject}</td>
                  <td className="px-6 py-4 border-b border-slate-100 text-slate-600">{item.class}</td>
                  <td className="px-6 py-4 border-b border-slate-100 text-slate-600">{item.teacher}</td>
                  <td className="px-6 py-4 border-b border-slate-100 font-medium text-orange-600">{item.dueDate}</td>
                  <td className="px-6 py-4 border-b border-slate-100 text-right">
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">View</Button>
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
