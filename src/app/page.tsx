'use client';

import React from 'react';
import { MetricCards } from '@/components/dashboard/metric-cards';
import { SalesOverview } from '@/components/dashboard/sales-overview';
import { TaskOverviewWidget } from '@/components/dashboard/task-overview';
import {
  InventoryStatusWidget,
  TopSellingProductsWidget,
} from '@/components/dashboard/inventory-top-products';
import { FinanceReportWidget } from '@/components/dashboard/finance-report';
import {
  initialMetrics,
  salesOverviewData,
  initialTasks,
  taskOverviewMetrics,
  initialInventory,
  topProducts,
  monthlyFinanceData,
  financeBreakdown,
} from '@/lib/data-store';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* 1. Metric Summary Cards */}
      <MetricCards metrics={initialMetrics} />

      {/* 2. Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Sales Overview & Finance Reports */}
        <div className="lg:col-span-2 space-y-6">
          <SalesOverview data={salesOverviewData} />
          <FinanceReportWidget
            barData={monthlyFinanceData}
            breakdownData={financeBreakdown}
          />
        </div>

        {/* Right Column (1 Col): Task Overview, Inventory & Top Products */}
        <div className="space-y-6">
          <TaskOverviewWidget
            tasks={initialTasks}
            metrics={taskOverviewMetrics}
          />
          <InventoryStatusWidget inventory={initialInventory} />
          <TopSellingProductsWidget products={topProducts} />
        </div>
      </div>
    </div>
  );
}
