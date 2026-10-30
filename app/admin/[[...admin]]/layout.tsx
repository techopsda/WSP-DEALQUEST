'use client';
import '../../../styles/admin.css';

import Header from '@/components/admin/Header';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="[ ns-admin ] flex flex-col h-screen">
      <>
        <Header />
        <div className="flex-1 flex flex-col">{children}</div>
      </>
    </div>
  );
}
