"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, Calendar, FileText, Clock, CheckCircle, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function OnlineTestsPage() {
  const [tests] = useState([
    { id: 1, title: "Science Weekly Test 4", class: "Class 5 - A", subject: "Science • Ch-5 Plant Physiology", date: "2026-09-02", duration: "30 mins", status: "Upcoming", totalQuestions: 15 },
    { id: 2, title: "Math Algebra Quiz", class: "Class 6 - B", subject: "Mathematics • Quadratic Equations", date: "2026-09-05", duration: "45 mins", status: "Upcoming", totalQuestions: 20 },
    { id: 3, title: "English Grammar Test", class: "Class 5 - A", subject: "English • Tenses & Verbs", date: "2026-08-28", duration: "20 mins", status: "Completed", totalQuestions: 10 }
  ]);

  return (
    <div className="space-y-6">
      {/* Top Title & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 p-6 rounded-2xl text-white shadow-lg">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Online Assessment Center</h1>
          <p className="text-blue-200 text-sm mt-1">Manage weekly quizzes, track student submissions, and view live results.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-md px-5 py-2.5 rounded-xl transition-all">
          <Plus className="mr-2 h-4 w-4" /> Create New Assessment
        </Button>
      </div>

      {/* Filters & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search test by title or subject..." 
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Button variant="outline" size="sm" className="text-slate-600 border-slate-200">
            <Filter className="mr-2 h-4 w-4" /> Filter Class
          </Button>
        </div>
      </div>

      {/* Main Data Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Test Information</th>
                <th className="px-6 py-4">Class & Subject</th>
                <th className="px-6 py-4">Duration & Questions</th>
                <th className="px-6 py-4">Scheduled Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tests.map((test) => (
                <tr key={test.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{test.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">ID: #TST-00{test.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-800 mb-1">
                      {test.class}
                    </span>
                    <div className="text-xs text-slate-500 font-medium">{test.subject}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-xs font-semibold text-slate-700 gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-blue-600" /> {test.duration}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">{test.totalQuestions} Questions</div>
                  </td>
                  <td className="px-6 py-4 text-xs font-semibold text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" /> {test.date}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {test.status === "Upcoming" ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/60">
                        Upcoming
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        <CheckCircle className="mr-1 h-3 w-3" /> Completed
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right space-x-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-600 hover:text-blue-600">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-600 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
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
