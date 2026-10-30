import { AdminDashboardWidget } from './AdminDashboardWidget';
import { ResponsiveProps } from 'react-grid-layout';

export type DashboardConfig = {
  enabled: boolean;
  className?: string;
  rowHeight?: number;
  colSpans?: ResponsiveProps['cols'];
  widgets: AdminDashboardWidget[];
};
