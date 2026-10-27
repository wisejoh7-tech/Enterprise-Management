'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Bell,
  User,
  Menu,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  Info,
  Command,
  LayoutDashboard,
  TrendingUp,
  Package,
  FolderKanban,
  Users,
  FileBarChart,
  Settings,
  X,
  Check,
} from 'lucide-react';
import { currentUser } from '@/lib/data-store';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [commandSearch, setCommandSearch] = useState('');

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Low Inventory Alert',
      desc: 'Wireless Mouse stock reached 0.',
      time: '10m ago',
      type: 'warning',
      read: false,
    },
    {
      id: 2,
      title: 'New Order Received',
      desc: 'ORD-9022 ($28,900.50) from Global Tech.',
      time: '1h ago',
      type: 'success',
      read: false,
    },
    {
      id: 3,
      title: 'System Maintenance',
      desc: 'Scheduled DB index cleanup tonight at 2 AM.',
      time: '3h ago',
      type: 'info',
      read: true,
    },
  ]);

  const navActions = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard, category: 'Navigation' },
    { name: 'Sales & Orders', href: '/sales', icon: TrendingUp, category: 'Navigation' },
    { name: 'Inventory Management', href: '/inventory', icon: Package, category: 'Navigation' },
    { name: 'Projects & Tasks', href: '/projects', icon: FolderKanban, category: 'Navigation' },
    { name: 'Human Resources', href: '/hr', icon: Users, category: 'Navigation' },
    { name: 'Finance & Ledger', href: '/finance', icon: TrendingUp, category: 'Navigation' },
    { name: 'Analytics & Reports', href: '/reports', icon: FileBarChart, category: 'Navigation' },
    { name: 'System Settings', href: '/settings', icon: Settings, category: 'Navigation' },
  ];

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const filteredActions = navActions.filter((a) =>
    a.name.toLowerCase().includes(commandSearch.toLowerCase())
  );

  const handleSelectAction = (href: string) => {
    router.push(href);
    setCommandPaletteOpen(false);
    setCommandSearch('');
  };

  return (
    <>
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

        {/* Right side: Command Palette Trigger, Notifications, Profile */}
        <div className="flex items-center gap-3">
          {/* Quick Search / Command Palette Trigger */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-all w-44 sm:w-64 justify-between"
          >
            <span className="flex items-center gap-2 truncate">
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">Quick jump / Search...</span>
            </span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] bg-slate-800 border border-slate-700 rounded text-slate-400 font-mono">
              <Command className="w-2.5 h-2.5" />K
            </kbd>
          </button>

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
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-blue-500 rounded-full ring-2 ring-[#0f172a] animate-pulse" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50">
                <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-200">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[10px]">
                    <button
                      onClick={markAllAsRead}
                      className="text-blue-400 hover:underline flex items-center gap-0.5"
                    >
                      <Check className="w-3 h-3" /> Mark read
                    </button>
                    <button
                      onClick={clearNotifications}
                      className="text-slate-500 hover:text-rose-400"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-slate-800 max-h-64 overflow-y-auto">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 hover:bg-slate-800/50 transition-colors flex gap-3 ${
                        !item.read ? 'bg-blue-500/5' : ''
                      }`}
                    >
                      {item.type === 'warning' && (
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      )}
                      {item.type === 'success' && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      )}
                      {item.type === 'info' && (
                        <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-medium text-slate-200">{item.title}</p>
                          {!item.read && (
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                        <span className="text-[10px] text-slate-500 mt-1 block">{item.time}</span>
                      </div>
                    </div>
                  ))}

                  {notifications.length === 0 && (
                    <div className="p-6 text-center text-xs text-slate-500">
                      No notifications available.
                    </div>
                  )}
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
                <button
                  onClick={() => {
                    router.push('/settings');
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-800 hover:text-white block"
                >
                  Account Settings
                </button>
                <button
                  onClick={() => {
                    router.push('/reports');
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-800 hover:text-white block"
                >
                  Audit Logs
                </button>
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

      {/* Command Palette Modal */}
      {commandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Input Header */}
            <div className="flex items-center px-4 border-b border-slate-800">
              <Search className="w-4 h-4 text-slate-400 shrink-0 mr-3" />
              <input
                type="text"
                autoFocus
                placeholder="Type a command or navigate to page..."
                value={commandSearch}
                onChange={(e) => setCommandSearch(e.target.value)}
                className="w-full py-3.5 bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
              />
              <button
                onClick={() => setCommandPaletteOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              <div className="px-3 py-1 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                Quick Navigation
              </div>
              {filteredActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.name}
                    onClick={() => handleSelectAction(action.href)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs text-slate-300 hover:bg-blue-600/20 hover:text-white transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-slate-400 group-hover:text-blue-400" />
                      <span>{action.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 group-hover:text-slate-400">
                      Jump to {action.href}
                    </span>
                  </button>
                );
              })}

              {filteredActions.length === 0 && (
                <div className="p-6 text-center text-xs text-slate-500">
                  No matching results found.
                </div>
              )}
            </div>

            {/* Footer hints */}
            <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
              <span>Press <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">Esc</kbd> to exit</span>
              <span>Enterprise Command Center</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
