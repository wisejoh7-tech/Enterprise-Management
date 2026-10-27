'use client';

import React, { useState } from 'react';
import { initialProjects } from '@/lib/data-store';
import { Project } from '@/lib/types';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import confetti from 'canvas-confetti';
import {
  Plus,
  Clock,
  Users,
  DollarSign,
  X,
} from 'lucide-react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [client, setClient] = useState('');
  const [budget, setBudget] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !client || !budget) return;

    const newPrj: Project = {
      id: `PRJ-${Math.floor(100 + Math.random() * 900)}`,
      name,
      client,
      status: 'In Progress',
      progressPercent: 10,
      deadline: deadline || '2027-01-01',
      budget: parseFloat(budget),
      teamCount: 4,
    };

    setProjects([newPrj, ...projects]);
    setIsModalOpen(false);
    setName('');
    setClient('');
    setBudget('');
  };

  const columns: { label: string; status: Project['status'] }[] = [
    { label: 'Planning', status: 'Planning' },
    { label: 'In Progress', status: 'In Progress' },
    { label: 'In Review', status: 'Review' },
    { label: 'Completed', status: 'Completed' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Projects & Operations</h1>
          <p className="text-xs text-slate-400">
            Kanban workflow tracking corporate initiatives, operational milestones, and team tasks.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Summary Cards with Status Chart */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-[#1e293b]/80 border border-slate-800 flex items-center gap-4">
          <div className="w-24 h-24 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Planning', value: projects.filter((p) => p.status === 'Planning').length },
                    { name: 'In Progress', value: projects.filter((p) => p.status === 'In Progress').length },
                    { name: 'Review', value: projects.filter((p) => p.status === 'Review').length },
                    { name: 'Completed', value: projects.filter((p) => p.status === 'Completed').length },
                  ]}
                  innerRadius={25}
                  outerRadius={40}
                  paddingAngle={4}
                  dataKey="value"
                >
                  <Cell fill="#94a3b8" />
                  <Cell fill="#3b82f6" />
                  <Cell fill="#f59e0b" />
                  <Cell fill="#10b981" />
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Status Breakdown</p>
            <p className="text-lg font-bold text-white">{projects.length} Total Initiatives</p>
            <div className="flex gap-2 text-[10px] mt-1">
              <span className="text-blue-400">● In Progress</span>
              <span className="text-amber-400">● Review</span>
              <span className="text-emerald-400">● Done</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#1e293b]/80 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Total Capital Allocated</p>
            <p className="text-2xl font-bold text-emerald-400">
              ${(projects.reduce((acc, curr) => acc + curr.budget, 0) / 1000).toFixed(0)}k
            </p>
            <p className="text-[10px] text-slate-500 mt-1">Across active client & internal projects</p>
          </div>
          <DollarSign className="w-8 h-8 text-emerald-500/30" />
        </div>

        <div className="p-4 rounded-2xl bg-[#1e293b]/80 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Active Resource Allocation</p>
            <p className="text-2xl font-bold text-white">
              {projects.reduce((acc, curr) => acc + curr.teamCount, 0)} Members
            </p>
            <p className="text-[10px] text-slate-500 mt-1">Assigned cross-functional team members</p>
          </div>
          <Users className="w-8 h-8 text-blue-500/30" />
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((col) => {
          const colProjects = projects.filter((p) => p.status === col.status);
          return (
            <div
              key={col.status}
              className="p-4 rounded-2xl bg-[#1e293b]/60 border border-slate-800 flex flex-col min-h-[500px]"
            >
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-200 tracking-wide">{col.label}</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-semibold">
                  {colProjects.length}
                </span>
              </div>

              <div className="space-y-3 flex-1">
                {colProjects.map((prj) => (
                  <div
                    key={prj.id}
                    className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm hover:border-slate-700 transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-blue-400 uppercase">{prj.id}</span>
                        <h4 className="text-xs font-bold text-white leading-snug">{prj.name}</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">Client: {prj.client}</p>
                      </div>
                      <select
                        value={prj.status}
                        onChange={(e) => {
                          const newStatus = e.target.value as Project['status'];
                          setProjects((prev) =>
                            prev.map((p) =>
                              p.id === prj.id
                                ? { ...p, status: newStatus, progressPercent: newStatus === 'Completed' ? 100 : p.progressPercent }
                                : p
                            )
                          );
                          if (newStatus === 'Completed') {
                            confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
                          }
                        }}
                        className="text-[10px] bg-slate-800 border border-slate-700 rounded text-slate-300 px-1 py-0.5"
                      >
                        <option value="Planning">Planning</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Review">Review</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>

                    {/* Progress Bar & Interactive Slider */}
                    <div>
                      <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                        <span>Progress</span>
                        <span className="font-semibold text-slate-200">{prj.progressPercent}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={prj.progressPercent}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setProjects((prev) =>
                            prev.map((p) =>
                              p.id === prj.id
                                ? {
                                    ...p,
                                    progressPercent: val,
                                    status: val === 100 ? 'Completed' : p.status,
                                  }
                                : p
                            )
                          );
                          if (val === 100) {
                            confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
                          }
                        }}
                        className="w-full accent-blue-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* Card Footer */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{prj.deadline}</span>
                      </div>
                      <div className="flex items-center gap-1 font-semibold text-slate-200">
                        <Users className="w-3 h-3 text-slate-500" />
                        <span>{prj.teamCount}</span>
                      </div>
                      <div className="font-bold text-emerald-400">
                        ${(prj.budget / 1000).toFixed(0)}k
                      </div>
                    </div>
                  </div>
                ))}

                {colProjects.length === 0 && (
                  <div className="flex items-center justify-center h-32 border border-dashed border-slate-800/80 rounded-xl text-slate-500 text-xs">
                    No projects in {col.label}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* New Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white">Create New Project</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI Customer Portal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Client / Stakeholder</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Executive Steering Committee"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Budget ($)</label>
                  <input
                    type="number"
                    required
                    placeholder="150000"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Target Deadline</label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold shadow-md shadow-blue-500/20"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
