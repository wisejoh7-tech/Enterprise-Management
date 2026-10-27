'use client';

import React, { useState } from 'react';
import { initialSettings } from '@/lib/data-store';
import { SystemSetting } from '@/lib/types';
import { Settings, Save, Shield, CheckCircle } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState<SystemSetting>(initialSettings);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">System Settings</h1>
        <p className="text-xs text-slate-400">
          Configure organization preferences, currency defaults, and security protocols.
        </p>
      </div>

      {savedNotice && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>System configuration updated successfully.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Organization Preferences */}
        <div className="p-6 rounded-2xl bg-[#1e293b]/80 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Settings className="w-4 h-4 text-blue-400" />
            <span>Organization Profile</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 font-medium mb-1">Company / Organization Name</label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Base Currency</label>
              <select
                value={settings.currency}
                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none"
              >
                <option value="USD ($)">USD ($)</option>
                <option value="EUR (€)">EUR (€)</option>
                <option value="GBP (£)">GBP (£)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security & Notifications */}
        <div className="p-6 rounded-2xl bg-[#1e293b]/80 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Security & Automation</span>
          </h2>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 cursor-pointer">
              <div>
                <p className="font-semibold text-slate-200">Two-Factor Authentication (2FA)</p>
                <p className="text-[11px] text-slate-400">Require 2FA verification for admin sign-ins</p>
              </div>
              <input
                type="checkbox"
                checked={settings.twoFactorAuth}
                onChange={(e) => setSettings({ ...settings, twoFactorAuth: e.target.checked })}
                className="w-4 h-4 rounded border-slate-700 text-blue-600 focus:ring-blue-500 bg-slate-800"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 cursor-pointer">
              <div>
                <p className="font-semibold text-slate-200">Automated Daily Cloud Backups</p>
                <p className="text-[11px] text-slate-400">Snapshot Postgres database every midnight</p>
              </div>
              <input
                type="checkbox"
                checked={settings.autoBackup}
                onChange={(e) => setSettings({ ...settings, autoBackup: e.target.checked })}
                className="w-4 h-4 rounded border-slate-700 text-blue-600 focus:ring-blue-500 bg-slate-800"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-md shadow-blue-500/20 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
}
