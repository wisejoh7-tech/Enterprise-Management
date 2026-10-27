'use client';

import React from 'react';
import { InventoryItem, TopProduct } from '@/lib/types';
import { Package } from 'lucide-react';

interface InventoryWidgetProps {
  inventory: InventoryItem[];
}

export function InventoryStatusWidget({ inventory }: InventoryWidgetProps) {
  return (
    <div className="p-5 rounded-2xl bg-[#1e293b]/80 border border-slate-800 shadow-lg flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-100 text-sm flex items-center gap-2">
          <span>Inventory Status</span>
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
        </h3>
        <a href="/inventory" className="text-xs text-blue-400 hover:text-blue-300 font-medium">
          Manage
        </a>
      </div>

      <div className="space-y-3">
        {inventory.slice(0, 3).map((item) => {
          const isLow = item.stock <= item.minStock;
          const isOut = item.stock === 0;

          return (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800/80"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-800 text-slate-300">
                  <Package className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-200">{item.name}</p>
                  <p className="text-[10px] text-slate-400">{item.category}</p>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
                    isOut
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      : isLow
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}
                >
                  {item.stock} units
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface TopProductsWidgetProps {
  products: TopProduct[];
}

export function TopSellingProductsWidget({ products }: TopProductsWidgetProps) {
  return (
    <div className="p-5 rounded-2xl bg-[#1e293b]/80 border border-slate-800 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-100 text-sm">Top Selling Products</h3>
        <span className="text-[10px] text-slate-400 uppercase tracking-wider">This Month</span>
      </div>

      <div className="space-y-3">
        {products.map((prod) => (
          <div
            key={prod.id}
            className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800/80"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-lg">
                {prod.image}
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-200">{prod.name}</p>
                <p className="text-[10px] text-slate-400">{prod.salesCount} sold</p>
              </div>
            </div>

            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
              ${prod.revenue.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
