import {
  UserProfile,
  MetricCard,
  SalesOverviewPoint,
  TaskItem,
  TaskMetric,
  InventoryItem,
  TopProduct,
  FinanceSummaryPoint,
  MonthlyFinancePoint,
  Order,
  Employee,
  Project,
  Transaction,
  SystemSetting,
} from './types';

export const currentUser: UserProfile = {
  name: 'David',
  role: 'Enterprise Administrator',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  email: 'david.admin@enterprise.io',
  department: 'Operations & Executive',
};

export const initialMetrics: MetricCard[] = [
  {
    id: '1',
    title: 'Revenue',
    value: '$1,250,000',
    rawAmount: 1250000,
    changePercent: 12.5,
    isPositive: true,
    subValue: '112.43k',
    period: 'vs last month',
  },
  {
    id: '2',
    title: 'Expenses',
    value: '$1,850,000',
    rawAmount: 1850000,
    changePercent: 18.3,
    isPositive: false,
    subValue: '$652,100',
    period: 'vs last month',
  },
  {
    id: '3',
    title: 'Returns',
    value: '$10,550',
    rawAmount: 10550,
    changePercent: 8.4,
    isPositive: true,
    subValue: '$550.82',
    period: 'vs last month',
  },
];

export const salesOverviewData: SalesOverviewPoint[] = [
  { month: 'Jan', sales: 4000, revenue: 240000, expenses: 180000 },
  { month: 'Feb', sales: 3000, revenue: 198000, expenses: 150000 },
  { month: 'Mar', sales: 5000, revenue: 320000, expenses: 210000 },
  { month: 'Apr', sales: 4500, revenue: 280000, expenses: 190000 },
  { month: 'May', sales: 6000, revenue: 410000, expenses: 250000 },
  { month: 'Jun', sales: 5500, revenue: 390000, expenses: 230000 },
  { month: 'Jul', sales: 7000, revenue: 520000, expenses: 310000 },
  { month: 'Aug', sales: 6800, revenue: 490000, expenses: 290000 },
  { month: 'Sep', sales: 7500, revenue: 580000, expenses: 340000 },
  { month: 'Oct', sales: 8200, revenue: 640000, expenses: 380000 },
  { month: 'Nov', sales: 9100, revenue: 730000, expenses: 420000 },
  { month: 'Dec', sales: 10500, revenue: 850000, expenses: 490000 },
];

export const initialTasks: TaskItem[] = [
  {
    id: 't1',
    title: 'Review monthly report',
    dueDate: 'Today, 5:00 PM',
    status: 'Pending',
    priority: 'High',
    assignee: 'David',
  },
  {
    id: 't2',
    title: 'Update inventory levels',
    dueDate: 'Tomorrow, 12:00 PM',
    status: 'In Progress',
    priority: 'Medium',
    assignee: 'Sarah Lin',
  },
  {
    id: 't3',
    title: 'Team meeting at 3 PM',
    dueDate: 'Today, 3:00 PM',
    status: 'Pending',
    priority: 'High',
    assignee: 'David',
  },
  {
    id: 't4',
    title: 'Finalize Q4 Financial Forecast',
    dueDate: 'Oct 30, 2026',
    status: 'In Progress',
    priority: 'High',
    assignee: 'Marcus Vance',
  },
];

export const taskOverviewMetrics: TaskMetric[] = [
  {
    id: 'tm1',
    label: 'Total Orders',
    amount: '$1,330',
    change: '1.25%',
    positive: true,
  },
  {
    id: 'tm2',
    label: 'Pending Approval',
    amount: '5,550',
    change: '4.83%',
    positive: false,
  },
  {
    id: 'tm3',
    label: 'Completed Tasks',
    amount: '12,320',
    change: '12.32%',
    positive: true,
  },
];

export const initialInventory: InventoryItem[] = [
  {
    id: 'inv1',
    name: 'Laptop Pro',
    category: 'Electronics',
    stock: 45,
    minStock: 20,
    price: 1499.99,
    status: 'In Stock',
    lastUpdated: '2 hours ago',
  },
  {
    id: 'inv2',
    name: 'Office Chair',
    category: 'Furniture',
    stock: 12,
    minStock: 15,
    price: 249.50,
    status: 'Low Stock',
    lastUpdated: '1 day ago',
  },
  {
    id: 'inv3',
    name: '4K Monitor',
    category: 'Electronics',
    stock: 8,
    minStock: 10,
    price: 499.00,
    status: 'Low Stock',
    lastUpdated: '3 hours ago',
  },
  {
    id: 'inv4',
    name: 'Ergonomic Keyboard',
    category: 'Accessories',
    stock: 120,
    minStock: 30,
    price: 89.99,
    status: 'In Stock',
    lastUpdated: '5 mins ago',
  },
  {
    id: 'inv5',
    name: 'Wireless Mouse',
    category: 'Accessories',
    stock: 0,
    minStock: 25,
    price: 39.99,
    status: 'Out of Stock',
    lastUpdated: 'Just now',
  },
];

export const topProducts: TopProduct[] = [
  {
    id: 'tp1',
    name: 'Smartwatch',
    category: 'Electronics',
    salesCount: 345,
    revenue: 103500,
    image: '⌚',
  },
  {
    id: 'tp2',
    name: 'Wireless Headphones',
    category: 'Audio',
    salesCount: 289,
    revenue: 57800,
    image: '🎧',
  },
  {
    id: 'tp3',
    name: 'Desk Lamp',
    category: 'Furniture',
    salesCount: 215,
    revenue: 12900,
    image: '💡',
  },
];

export const financeBreakdown: FinanceSummaryPoint[] = [
  { name: 'Income', value: 55, color: '#3b82f6' },
  { name: 'Expenses', value: 30, color: '#f97316' },
  { name: 'Investments', value: 15, color: '#10b981' },
];

export const monthlyFinanceData: MonthlyFinancePoint[] = [
  { month: 'Q1', income: 450000, expenses: 320000, profit: 130000 },
  { month: 'Q2', income: 520000, expenses: 350000, profit: 170000 },
  { month: 'Q3', income: 610000, expenses: 410000, profit: 200000 },
  { month: 'Q4', income: 780000, expenses: 490000, profit: 290000 },
];

export const initialOrders: Order[] = [
  {
    id: 'ORD-9021',
    customerName: 'Acme Corporation',
    customerEmail: 'billing@acme.com',
    date: '2026-10-26',
    total: 14500.0,
    status: 'Completed',
    itemsCount: 12,
  },
  {
    id: 'ORD-9022',
    customerName: 'Global Tech Solutions',
    customerEmail: 'procurement@globaltech.io',
    date: '2026-10-27',
    total: 28900.5,
    status: 'Processing',
    itemsCount: 24,
  },
  {
    id: 'ORD-9023',
    customerName: 'Nexus Logistics',
    customerEmail: 'ops@nexus.com',
    date: '2026-10-27',
    total: 3400.0,
    status: 'Pending',
    itemsCount: 5,
  },
  {
    id: 'ORD-9024',
    customerName: 'Starlight Retail',
    customerEmail: 'orders@starlight.com',
    date: '2026-10-25',
    total: 8750.0,
    status: 'Completed',
    itemsCount: 8,
  },
];

export const initialEmployees: Employee[] = [
  {
    id: 'EMP-01',
    name: 'David Miller',
    role: 'VP of Operations',
    department: 'Executive',
    email: 'david.m@enterprise.com',
    phone: '+1 (555) 019-2834',
    status: 'Active',
    joinDate: '2020-03-15',
    salary: 165000,
  },
  {
    id: 'EMP-02',
    name: 'Sarah Lin',
    role: 'Head of Logistics',
    department: 'Supply Chain',
    email: 'sarah.lin@enterprise.com',
    phone: '+1 (555) 018-9921',
    status: 'Active',
    joinDate: '2021-06-01',
    salary: 125000,
  },
  {
    id: 'EMP-03',
    name: 'Marcus Vance',
    role: 'Chief Financial Analyst',
    department: 'Finance',
    email: 'marcus.v@enterprise.com',
    phone: '+1 (555) 012-7743',
    status: 'Active',
    joinDate: '2019-11-10',
    salary: 140000,
  },
  {
    id: 'EMP-04',
    name: 'Elena Rostova',
    role: 'HR Director',
    department: 'Human Resources',
    email: 'elena.r@enterprise.com',
    phone: '+1 (555) 014-3312',
    status: 'On Leave',
    joinDate: '2022-01-20',
    salary: 115000,
  },
];

export const initialProjects: Project[] = [
  {
    id: 'PRJ-101',
    name: 'ERP Cloud Migration',
    client: 'Internal',
    status: 'In Progress',
    progressPercent: 68,
    deadline: '2026-12-15',
    budget: 250000,
    teamCount: 12,
  },
  {
    id: 'PRJ-102',
    name: 'Warehouse Automation',
    client: 'LogiTech Partner',
    status: 'In Progress',
    progressPercent: 42,
    deadline: '2027-02-28',
    budget: 480000,
    teamCount: 18,
  },
  {
    id: 'PRJ-103',
    name: 'Q3 Audit & Compliance',
    client: 'Finance Board',
    status: 'Review',
    progressPercent: 90,
    deadline: '2026-11-05',
    budget: 75000,
    teamCount: 6,
  },
];

export const initialTransactions: Transaction[] = [
  {
    id: 'TXN-8801',
    type: 'Income',
    category: 'Sales Revenue',
    description: 'Enterprise ERP License Renewal - Acme Corp',
    amount: 145000,
    date: '2026-10-25',
    status: 'Paid',
  },
  {
    id: 'TXN-8802',
    type: 'Expense',
    category: 'Infrastructure',
    description: 'AWS Cloud Hosting & Database Server',
    amount: 34200,
    date: '2026-10-24',
    status: 'Paid',
  },
  {
    id: 'TXN-8803',
    type: 'Expense',
    category: 'Payroll',
    description: 'Executive & Departmental Monthly Payroll',
    amount: 420000,
    date: '2026-10-20',
    status: 'Paid',
  },
];

export const initialSettings: SystemSetting = {
  companyName: 'Enterprise Inc.',
  currency: 'USD ($)',
  fiscalYearStart: 'January 1',
  emailNotifications: true,
  autoBackup: true,
  twoFactorAuth: true,
  theme: 'dark',
};
