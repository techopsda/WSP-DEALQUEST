import { DashboardConfig } from '../../types/Config/DashboardConfig';
import { Responsive, WidthProvider } from 'react-grid-layout';

interface AdminDashboardProps {
  dashboardConfig: DashboardConfig;
}
const ResponsiveGridLayout = WidthProvider(Responsive);

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  dashboardConfig: { widgets, rowHeight, colSpans, className }
}) => {
  const layout = widgets.map((widget, index) => {
    const x = index % 3;
    const y = Math.floor(index / 3);

    return {
      i: widget?.key,
      x,
      y,
      w: widget?.span,
      h: widget?.height,
      minH: widget?.minHeight,
      minW: widget?.minWidth
    } as ReactGridLayout.Layout;
  });

  const getLayouts = () => {
    const savedLayouts = localStorage.getItem('admin-dashboard');
    return savedLayouts ? JSON.parse(savedLayouts) : { lg: layout };
  };

  const handleLayoutChange = (layout: any, layouts: any) => {
    localStorage.setItem('admin-dashboard', JSON.stringify(layouts));
  };

  return (
    <ResponsiveGridLayout
      className={className ?? 'flex h-screen'}
      layouts={getLayouts()}
      rowHeight={rowHeight ?? 24}
      cols={colSpans ?? { lg: 3, md: 3, sm: 2, xs: 2, xxs: 1 }}
      onLayoutChange={handleLayoutChange}
    >
      {widgets.map((widget) => {
        return (
          <div className="flex" key={widget?.key}>
            {widget?.component}
          </div>
        );
      })}
    </ResponsiveGridLayout>
  );
};
