"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Coffee, Calendar as CalendarIcon, Save } from 'lucide-react-native';
import * as LucideIcons from 'lucide-react'; // use lucide-react for nextjs

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const times = [
  '08:00 AM - 08:45 AM',
  '08:45 AM - 09:30 AM',
  '09:30 AM - 09:45 AM', // Break slot
  '09:45 AM - 10:30 AM',
  '10:30 AM - 11:15 AM'
];

export default function TimetableAdminPage() {
  const [selectedClass, setSelectedClass] = useState("Class 5 - A");
  
  // mock state for slots [day-time] -> { isBreak, subject, teacher }
  const [slots, setSlots] = useState<Record<string, any>>({
    'Monday-09:30 AM - 09:45 AM': { isBreak: true, label: 'Snack Break' },
    'Tuesday-09:30 AM - 09:45 AM': { isBreak: true, label: 'Snack Break' },
    'Wednesday-09:30 AM - 09:45 AM': { isBreak: true, label: 'Snack Break' },
    'Thursday-09:30 AM - 09:45 AM': { isBreak: true, label: 'Snack Break' },
    'Friday-09:30 AM - 09:45 AM': { isBreak: true, label: 'Snack Break' },
    'Saturday-09:30 AM - 09:45 AM': { isBreak: true, label: 'Snack Break' },
    'Monday-08:00 AM - 08:45 AM': { subject: 'Mathematics', teacher: 'Mr. Rajesh' },
    'Tuesday-08:00 AM - 08:45 AM': { subject: 'Science', teacher: 'Mrs. Neha' },
  });

  const handleSlotClick = (day: string, time: string) => {
    const key = `${day}-${time}`;
    if (time.includes('09:30')) {
      // Toggle Break
      setSlots(prev => ({
        ...prev,
        [key]: prev[key] ? null : { isBreak: true, label: 'Lunch Break' }
      }));
    } else {
      // Cycle through subjects for demo purposes
      const cycle = [
        { subject: 'English', teacher: 'Mrs. Priya' },
        { subject: 'Hindi', teacher: 'Mrs. Kavita' },
        { subject: 'Computer', teacher: 'Mr. Sandeep' },
        null
      ];
      setSlots(prev => {
        const current = prev[key];
        let nextIdx = 0;
        if (current) {
          nextIdx = (cycle.findIndex(c => c?.subject === current.subject) + 1) % cycle.length;
        }
        return { ...prev, [key]: cycle[nextIdx] };
      });
    }
  };

  const handlePublish = async () => {
    try {
      // In a real scenario, this would loop through `slots` and call POST /api/v1/admin/timetables
      alert("Timetable Published Successfully to Teachers & Parents!");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <LucideIcons.Calendar className="w-6 h-6 text-indigo-600" />
            </div>
            Timetable Manager
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Create and publish schedule grids for Classes</p>
        </div>
        <div className="flex items-center gap-4">
          <select 
            className="border-slate-200 border rounded-lg px-4 py-2 font-semibold text-slate-700 outline-none focus:border-indigo-500"
            value={selectedClass} 
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option>Class 5 - A</option>
            <option>Class 8 - A</option>
            <option>Class 10 - B</option>
          </select>
          <Button onClick={handlePublish} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6">
            <LucideIcons.Save className="w-4 h-4 mr-2" /> Publish Grid
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-xs">
              <tr>
                <th className="px-6 py-4 border-b border-r border-slate-200 text-center w-40 bg-slate-100">Time / Day</th>
                {days.map(d => (
                  <th key={d} className="px-6 py-4 border-b border-slate-200 text-center min-w-[150px]">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {times.map((time, idx) => {
                const isBreakTimeRow = time.includes('09:30');
                
                return (
                  <tr key={time} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-4 border-b border-r border-slate-200 text-center font-bold text-slate-700 bg-slate-50">
                      {time}
                    </td>
                    {days.map(day => {
                      const key = `${day}-${time}`;
                      const slotData = slots[key];

                      return (
                        <td 
                          key={day} 
                          onClick={() => handleSlotClick(day, time)}
                          className={`px-2 py-2 border-b border-slate-200 text-center cursor-pointer transition-all ${isBreakTimeRow ? 'bg-orange-50/30' : ''}`}
                        >
                          {!slotData ? (
                            <div className="h-16 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl hover:border-indigo-400 hover:bg-indigo-50 text-slate-400 group">
                              <LucideIcons.Plus className="w-5 h-5 group-hover:text-indigo-600 group-hover:scale-110 transition-transform" />
                            </div>
                          ) : slotData.isBreak ? (
                            <div className="h-16 flex flex-col items-center justify-center bg-orange-100 border border-orange-200 rounded-xl text-orange-700 shadow-sm">
                              <LucideIcons.Coffee className="w-4 h-4 mb-1" />
                              <span className="font-bold text-xs">{slotData.label}</span>
                            </div>
                          ) : (
                            <div className="h-16 flex flex-col items-center justify-center bg-blue-50 border border-blue-200 rounded-xl text-blue-800 shadow-sm hover:ring-2 ring-blue-400 ring-offset-1">
                              <span className="font-bold text-sm truncate w-full px-2">{slotData.subject}</span>
                              <span className="text-xs text-blue-600/80 font-medium truncate w-full px-2 mt-0.5">{slotData.teacher}</span>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
