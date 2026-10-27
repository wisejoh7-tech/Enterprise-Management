'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { SalesOverviewPoint } from '@/lib/types';
import { HelpCircle, Expand } from 'lucide-react';

interface SalesOverviewProps {
  data: SalesOverviewPoint[];
}

export function SalesOverview({ data }: SalesOverviewProps) {
  return (
    <div className="p-5 rounded-2xl bg-[#1e293b]/80 border border-slate-800 shadow-lg flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-slate-100 text-sm">Sales Overview</h3>
          <HelpCircle className="w-3.5 h-3.5 text-slate-500 cursor-pointer" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
            2026 Monthly
          </span>
          <button className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800">
            <Expand className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="w-full h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
            <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '0.75rem',
                color: '#f8fafc',
                fontSize: '12px',
              }}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorSales)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
