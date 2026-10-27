'use client';

import React, { useState } from 'react';
import {
  FileText,
  Download,
  Filter,
  BarChart,
  CheckCircle,
  FileSpreadsheet,
} from 'lucide-react';
import {
  salesOverviewData,
  initialInventory,
  initialEmployees,
  initialTransactions,
} from '@/lib/data-store';

export default function ReportsPage() {
  const [reportType, setReportType] = useState('Sales');
  const [format, setFormat] = useState('CSV');
  const [exportedNotice, setExportedNotice] = useState<string | null>(null);

  const handleExport = () => {
    let content = '';
    let filename = `${reportType.toLowerCase()}_report.${format.toLowerCase()}`;

    if (reportType === 'Sales') {
      content = 'Month,Sales,Revenue,Expenses\n' + salesOverviewData.map((d) => `${d.month},${d.sales},${d.revenue},${d.expenses}`).join('\n');
    } else if (reportType === 'Inventory') {
      content = 'Name,Category,Stock,Price,Status\n' + initialInventory.map((i) => `"${i.name}",${i.category},${i.stock},${i.price},${i.status}`).join('\n');
    } else if (reportType === 'Staff') {
      content = 'Name,Role,Department,Email,Salary\n' + initialEmployees.map((e) => `"${e.name}","${e.role}",${e.department},${e.email},${e.salary}`).join('\n');
    } else {
      content = 'ID,Type,Category,Description,Amount\n' + initialTransactions.map((t) => `${t.id},${t.type},${t.category},"${t.description}",${t.amount}`).join('\n');
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportedNotice(`Exported ${reportType} report successfully as ${filename}`);
    setTimeout(() => setExportedNotice(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Enterprise Analytics & Reports</h1>
        <p className="text-xs text-slate-400">
          Generate consolidated financial, operational, and inventory export files.
        </p>
      </div>

      {exportedNotice && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>{exportedNotice}</span>
        </div>
      )}

      {/* Report Generator Box */}
      <div className="p-6 rounded-2xl bg-[#1e293b]/80 border border-slate-800 space-y-6 max-w-2xl">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4 text-blue-400" />
          <span>Custom Report Builder</span>
        </h2>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 font-medium mb-1.5">Select Module / Domain</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['Sales', 'Inventory', 'Staff', 'Finance'].map((type) => (
                <button
                  key={type}
                  onClick={() => setReportType(type)}
                  className={`p-3 rounded-xl border text-center font-semibold transition-all ${
                    reportType === type
                      ? 'bg-blue-600/20 text-blue-400 border-blue-500/40'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1.5">Export Format</label>
            <div className="flex items-center gap-3">
              {['CSV', 'JSON'].map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setFormat(fmt)}
                  className={`px-4 py-2 rounded-xl border font-medium ${
                    format === fmt
                      ? 'bg-slate-800 text-white border-blue-500'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  .{fmt.toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs shadow-md shadow-blue-500/20 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Generate & Download Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
