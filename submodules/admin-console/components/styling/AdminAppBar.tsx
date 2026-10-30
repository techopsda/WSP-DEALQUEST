import { AdminBreadcrumbs } from './AdminBreadcrumbs';
import { AppBarProps, SidebarToggleButton } from 'react-admin';

interface AdminAppBarProps {
  resourcesWithPages: { schema?: string | null; name: string }[];
}

export const AdminAppBar: React.FC<AppBarProps & AdminAppBarProps> = ({ resourcesWithPages }) => {
  return (
    <header className="relative -mt-12 flex items-center gap-5 border-b border-gray-200 bg-gray-50">
      <div className="border-r border-gray-200 p-2">
        <SidebarToggleButton />
      </div>
      <AdminBreadcrumbs resourcesWithPages={resourcesWithPages} />
    </header>
  );
};
