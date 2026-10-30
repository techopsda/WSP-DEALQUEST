'use client';

import type { AdminConfig } from '@/submodules/admin-console/types/Config/AdminConfig';
import dynamic from 'next/dynamic';
import { schemas } from '../../../database/adminConfig';

const App = dynamic(() => import('@/submodules/admin-console/components/AdminApp'), { ssr: false });

export const AdminPageClient = () => {
  const config: AdminConfig = { schemas };
  return <App config={config} />;
};
