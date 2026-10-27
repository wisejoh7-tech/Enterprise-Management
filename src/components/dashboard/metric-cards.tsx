'use client';

import React from 'react';
import { TrendingUp, TrendingDown, HelpCircle, ArrowUpRight } from 'lucide-react';
import { MetricCard } from '@/lib/types';

interface MetricCardsProps {
  metrics: MetricCard[];
}

export function MetricCards({ metrics }: MetricCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className="relative overflow-hidden p-5 rounded-2xl bg-[#1e293b]/80 border border-slate-800 shadow-lg hover:border-slate-700/80 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <span>{metric.title}</span>
              <HelpCircle className="w-3.5 h-3.5 text-slate-500 hover:text-slate-400 cursor-pointer" />
            </div>
            {metric.subValue && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {metric.subValue}
              </span>
            )}
          </div>

          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {metric.value}
            </h2>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs">
            <div
              className={`flex items-center gap-1 font-semibold px-2 py-0.5 rounded-md ${
                metric.isPositive
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}
            >
              {metric.isPositive ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5" />
              )}
              <span>+{metric.changePercent}%</span>
            </div>
            <span className="text-slate-500 text-[11px]">{metric.period}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
