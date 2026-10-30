export type AdminDashboardWidget = {
  key: string;
  component: React.ReactNode;
  defaultX?: number;
  defaultY?: number;
  span: number;
  height: number;
  minHeight?: number;
  minWidth?: number;
};
