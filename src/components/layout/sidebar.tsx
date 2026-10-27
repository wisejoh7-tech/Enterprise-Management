'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  TrendingUp,
  Package,
  FolderKanban,
  Users,
  FileBarChart,
  Settings,
  Menu,
  X,
  Building2,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Sales', href: '/sales', icon: TrendingUp },
  { name: 'Inventory', href: '/inventory', icon: Package },
  { name: 'Projects', href: '/projects', icon: FolderKanban },
  { name: 'HR', href: '/hr', icon: Users },
  { name: 'Reports', href: '/reports', icon: FileBarChart },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden backdrop-blur-sm"
          onClick={onToggle}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col w-64 bg-[#1e293b] text-slate-300 transition-transform duration-300 ease-in-out border-r border-slate-800/80 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-800">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20 group-hover:bg-blue-500 transition-colors">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg text-white tracking-wide block leading-tight">
                Enterprise
              </span>
              <span className="text-[10px] text-slate-400 tracking-wider uppercase">
                Management System
              </span>
            </div>
          </Link>
          <button
            onClick={onToggle}
            className="p-1 rounded-md text-slate-400 hover:text-white md:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer info / quick status */}
        <div className="p-4 m-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-slate-200">System Online</span>
          </div>
          <p className="text-[11px] text-slate-500">v2.4 Enterprise Production</p>
        </div>
      </aside>
    </>
  );
}
