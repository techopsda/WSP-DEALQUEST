import { getResourcesWithPages } from '../../lib/getResourcesWithPages';
import { AdminConfig } from '../../types/Config/AdminConfig';
import { SupabaseResource } from '../../types/SupabaseResource';
import { AppLocationContext } from '../react-admin/ra-navigation';
import { AdminAppBar } from './AdminAppBar';
import { AdminMenu } from './AdminMenu';
import { AdminSideBar } from './AdminSideBar';
import _ from 'lodash';
import { CoreLayoutProps, Layout } from 'react-admin';

interface AdminLayoutProps {
  config?: AdminConfig;
  resources: SupabaseResource[];
}

export const AdminLayout: React.FC<CoreLayoutProps & AdminLayoutProps> = (props) => {
  const resourcesWithPages = getResourcesWithPages(props?.resources, props?.config);

  return (
    <AppLocationContext>
      <Layout
        {...props}
        menu={(menuProps) => <AdminMenu {...menuProps} resourcesWithPages={resourcesWithPages} />}
        sidebar={(sidebarProps) => <AdminSideBar {...sidebarProps} />}
        appBar={(appBarProps) => <AdminAppBar {...appBarProps} resourcesWithPages={resourcesWithPages} />}
        className="min-h-full w-full"
      />
    </AppLocationContext>
  );
};
