'use client';

import React, { useState } from 'react';
import { TaskItem, TaskMetric } from '@/lib/types';
import { Check, Clock, Calendar, ArrowUpRight, ArrowDownRight, Expand } from 'lucide-react';

interface TaskOverviewWidgetProps {
  tasks: TaskItem[];
  metrics: TaskMetric[];
  onToggleTask?: (id: string) => void;
}

export function TaskOverviewWidget({ tasks, metrics, onToggleTask }: TaskOverviewWidgetProps) {
  const [taskList, setTaskList] = useState(tasks);

  const toggleTask = (id: string) => {
    setTaskList((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === 'Completed' ? 'Pending' : 'Completed' }
          : t
      )
    );
    if (onToggleTask) onToggleTask(id);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Top Tasks List Card */}
      <div className="p-5 rounded-2xl bg-[#1e293b]/80 border border-slate-800 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-100 text-sm">Task Overview</h3>
          <button className="text-xs text-blue-400 hover:text-blue-300 font-medium">View all</button>
        </div>

        <div className="space-y-3">
          {taskList.map((task) => {
            const isDone = task.status === 'Completed';
            return (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                  isDone
                    ? 'bg-slate-900/40 border-slate-800 opacity-60'
                    : 'bg-slate-900/80 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border text-xs transition-colors ${
                      isDone
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'border-slate-600 hover:border-blue-400'
                    }`}
                  >
                    {isDone && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <p
                      className={`text-xs font-medium text-slate-200 ${
                        isDone ? 'line-through text-slate-400' : ''
                      }`}
                    >
                      {task.title}
                    </p>
                    <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {task.dueDate}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full border ${
                    task.priority === 'High'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {task.priority}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Task Numeric Metrics Strip (Matching $1,330, 5,550, 12,320 in screenshot) */}
      <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#1e293b]/80 border border-slate-800 relative">
        <button className="absolute top-2 right-2 text-slate-500 hover:text-slate-300">
          <Expand className="w-3.5 h-3.5" />
        </button>
        {metrics.map((m) => (
          <div key={m.id} className="p-2.5 rounded-xl bg-slate-900/60 text-center">
            <span className="text-[10px] font-medium text-slate-400 block">{m.label}</span>
            <span className="text-sm font-bold text-white block mt-0.5">{m.amount}</span>
            <div
              className={`flex items-center justify-center gap-0.5 text-[10px] font-semibold mt-1 ${
                m.positive ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {m.positive ? (
                <ArrowUpRight className="w-3 h-3" />
              ) : (
                <ArrowDownRight className="w-3 h-3" />
              )}
              <span>{m.change}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
