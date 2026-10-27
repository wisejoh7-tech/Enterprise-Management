'use client';

import React, { useState } from 'react';
import {
  Search,
  Bell,
  User,
  Menu,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { currentUser } from '@/lib/data-store';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    {
      id: 1,
      title: 'Low Inventory Alert',
      desc: 'Wireless Mouse stock reached 0.',
      time: '10m ago',
      type: 'warning',
    },
    {
      id: 2,
      title: 'New Order Received',
      desc: 'ORD-9022 ($28,900.50) from Global Tech.',
      time: '1h ago',
      type: 'success',
    },
    {
      id: 3,
      title: 'System Maintenance',
      desc: 'Scheduled DB index cleanup tonight at 2 AM.',
      time: '3h ago',
      type: 'info',
    },
  ];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-800">
      {/* Left side: Mobile Toggle & Welcome message */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 text-slate-400 rounded-lg hover:text-white hover:bg-slate-800 md:hidden"
          aria-label="Toggle navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:block">
          <h1 className="text-lg font-bold text-white leading-tight">
            Welcome, {currentUser.name}!
          </h1>
          <p className="text-xs text-slate-400">
            Overview of enterprise metrics and ongoing operational tasks.
          </p>
        </div>
      </div>

      {/* Right side: Search, Notifications, Profile */}
      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <div className="relative w-44 sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search operations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Notifications Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="relative p-2 text-slate-400 rounded-xl hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-[#0f172a]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50">
              <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-200">Notifications</span>
                <span className="text-[10px] text-blue-400 cursor-pointer hover:underline">
                  Mark all read
                </span>
              </div>
              <div className="divide-y divide-slate-800 max-h-64 overflow-y-auto">
                {notifications.map((item) => (
                  <div key={item.id} className="p-3 hover:bg-slate-800/50 transition-colors flex gap-3">
                    {item.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />}
                    {item.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
                    {item.type === 'info' && <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />}
                    <div>
                      <p className="text-xs font-medium text-slate-200">{item.title}</p>
                      <p className="text-[11px] text-slate-400">{item.desc}</p>
                      <span className="text-[10px] text-slate-500 mt-1 block">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-800 transition-colors text-slate-300"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
              <User className="w-4 h-4" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold leading-none text-slate-200">{currentUser.name}</p>
              <p className="text-[10px] text-slate-400 leading-tight">{currentUser.role}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-1 z-50 text-xs text-slate-300">
              <div className="px-4 py-2 border-b border-slate-800">
                <p className="font-semibold text-slate-200">{currentUser.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
              </div>
              <a href="/settings" className="block px-4 py-2 hover:bg-slate-800 hover:text-white">
                Account Settings
              </a>
              <a href="/reports" className="block px-4 py-2 hover:bg-slate-800 hover:text-white">
                Audit Logs
              </a>
              <div className="border-t border-slate-800 mt-1">
                <button
                  onClick={() => alert('Signed out successfully.')}
                  className="w-full text-left px-4 py-2 text-rose-400 hover:bg-slate-800"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
