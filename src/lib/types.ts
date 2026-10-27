export interface UserProfile {
  name: string;
  role: string;
  avatarUrl: string;
  email: string;
  department: string;
}

export interface MetricCard {
  id: string;
  title: string;
  value: string;
  rawAmount: number;
  changePercent: number;
  isPositive: boolean;
  subValue?: string;
  period: string;
}

export interface SalesOverviewPoint {
  month: string;
  sales: number;
  revenue: number;
  expenses: number;
}

export interface TaskItem {
  id: string;
  title: string;
  dueDate: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  assignee: string;
}

export interface TaskMetric {
  id: string;
  label: string;
  amount: string;
  change: string;
  positive: boolean;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  price: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  lastUpdated: string;
}

export interface TopProduct {
  id: string;
  name: string;
  category: string;
  salesCount: number;
  revenue: number;
  image: string;
}

export interface FinanceSummaryPoint {
  name: string;
  value: number;
  color: string;
}

export interface MonthlyFinancePoint {
  month: string;
  income: number;
  expenses: number;
  profit: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  total: number;
  status: 'Completed' | 'Processing' | 'Pending' | 'Cancelled';
  itemsCount: number;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  status: 'Active' | 'On Leave' | 'Terminated';
  joinDate: string;
  salary: number;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  status: 'Planning' | 'In Progress' | 'Review' | 'Completed';
  progressPercent: number;
  deadline: string;
  budget: number;
  teamCount: number;
}

export interface Transaction {
  id: string;
  type: 'Income' | 'Expense';
  category: string;
  description: string;
  amount: number;
  date: string;
  status: 'Paid' | 'Pending';
}

export interface SystemSetting {
  companyName: string;
  currency: string;
  fiscalYearStart: string;
  emailNotifications: boolean;
  autoBackup: boolean;
  twoFactorAuth: boolean;
  theme: 'dark' | 'light' | 'system';
}
