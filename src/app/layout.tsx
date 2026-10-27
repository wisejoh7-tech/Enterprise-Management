import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { DashboardShell } from '@/components/layout/shell';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Enterprise Management System',
  description: 'Enterprise resource management operations dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#090d16] text-slate-100 antialiased`}>
        <DashboardShell>{children}</DashboardShell>
      </body>
    </html>
  );
}
