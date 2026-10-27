'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { MonthlyFinancePoint, FinanceSummaryPoint } from '@/lib/types';

interface FinanceReportProps {
  barData: MonthlyFinancePoint[];
  breakdownData: FinanceSummaryPoint[];
}

export function FinanceReportWidget({ barData, breakdownData }: FinanceReportProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Quarterly Finance Bar Chart */}
      <div className="p-5 rounded-2xl bg-[#1e293b]/80 border border-slate-800 shadow-lg flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-100 text-sm">Finance Report</h3>
          <span className="text-[11px] font-medium text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
            Quarterly
          </span>
        </div>

        <div className="w-full h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '0.75rem',
                  color: '#f8fafc',
                  fontSize: '11px',
                }}
              />
              <Bar dataKey="income" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Finance Distribution Donut Chart */}
      <div className="p-5 rounded-2xl bg-[#1e293b]/80 border border-slate-800 shadow-lg flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-slate-100 text-sm">Finance Report</h3>
          <span className="text-xs text-slate-400">Distribution</span>
        </div>

        <div className="flex items-center justify-around h-52">
          <div className="w-36 h-36">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={breakdownData}
                  cx="50%"
                  cy="50%"
                  innerRadius={38}
                  outerRadius={58}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {breakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.5rem',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 text-xs">
            {breakdownData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-300 font-medium">{item.name}</span>
                <span className="text-slate-400 font-bold ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
