"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash, Upload, CheckCircle2 } from 'lucide-react-native';

// For simplicity, using lucide-react (since this is next.js)
import * as LucideIcons from 'lucide-react';

export default function ResultsUploadPage() {
  const [examName, setExamName] = useState('Half-Yearly Examination 2024-25');
  const [studentId, setStudentId] = useState('');
  const [subjects, setSubjects] = useState([{ name: '', maxMarks: 100, obtained: 0 }]);
  const [success, setSuccess] = useState(false);

  const calculateGrade = (percentage: number) => {
    if (percentage >= 91) return 'A1';
    if (percentage >= 81) return 'A2';
    if (percentage >= 71) return 'B1';
    if (percentage >= 61) return 'B2';
    if (percentage >= 51) return 'C1';
    if (percentage >= 41) return 'C2';
    if (percentage >= 33) return 'D';
    return 'E (Needs Improvement)';
  };

  const handleSave = async () => {
    let totalMax = 0;
    let totalObt = 0;
    
    const formattedSubjects = subjects.map(s => {
      totalMax += Number(s.maxMarks);
      totalObt += Number(s.obtained);
      const perc = (Number(s.obtained) / Number(s.maxMarks)) * 100;
      return {
        subjectName: s.name,
        maxMarks: Number(s.maxMarks),
        marksObtained: Number(s.obtained),
        grade: calculateGrade(perc)
      };
    });

    const percentage = (totalObt / totalMax) * 100;
    const overallGrade = calculateGrade(percentage);

    const payload = {
      studentId: "647b0a7d903e1c001f3eabcd", // Mocked Student ID for testing
      examName,
      subjects: formattedSubjects,
      totalMaxMarks: totalMax,
      totalMarksObtained: totalObt,
      percentage: Number(percentage.toFixed(2)),
      overallGrade,
      remarks: percentage > 80 ? 'Excellent performance! Keep it up.' : 'Needs more focus on studies.',
      attendance: '92%'
    };

    try {
      // API call would go here
      // await fetch('http://localhost:5000/api/v1/admin/academics/report-card', { ... })
      
      console.log("Payload to send:", payload);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Upload Report Card</h1>
        <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <LucideIcons.Upload className="w-4 h-4 mr-2" /> Publish Result
        </Button>
      </div>

      {success && (
        <div className="bg-green-50 text-green-700 p-4 rounded-lg flex items-center border border-green-200">
          <LucideIcons.CheckCircle2 className="w-5 h-5 mr-2" />
          Report Card published successfully to Parent App!
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Exam Name</Label>
            <Input value={examName} onChange={e => setExamName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Student Search</Label>
            <Input placeholder="Enter Admission No or Name..." value={studentId} onChange={e => setStudentId(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Marks Entry</CardTitle>
          <Button variant="outline" size="sm" onClick={() => setSubjects([...subjects, { name: '', maxMarks: 100, obtained: 0 }])}>
            <LucideIcons.Plus className="w-4 h-4 mr-2" /> Add Subject
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {subjects.map((sub, idx) => (
            <div key={idx} className="flex gap-4 items-end">
              <div className="flex-1 space-y-2">
                <Label>Subject Name</Label>
                <Input value={sub.name} onChange={e => {
                  const s = [...subjects]; s[idx].name = e.target.value; setSubjects(s);
                }} placeholder="e.g. Mathematics" />
              </div>
              <div className="w-24 space-y-2">
                <Label>Max Marks</Label>
                <Input type="number" value={sub.maxMarks} onChange={e => {
                  const s = [...subjects]; s[idx].maxMarks = Number(e.target.value); setSubjects(s);
                }} />
              </div>
              <div className="w-32 space-y-2">
                <Label>Obtained</Label>
                <Input type="number" value={sub.obtained} onChange={e => {
                  const s = [...subjects]; s[idx].obtained = Number(e.target.value); setSubjects(s);
                }} />
              </div>
              <Button variant="ghost" className="text-red-500 mb-0.5" onClick={() => {
                const s = [...subjects]; s.splice(idx, 1); setSubjects(s);
              }}>
                <LucideIcons.Trash className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
