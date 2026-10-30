import { Breadcrumb, useDefineAppLocation } from '../react-admin/ra-navigation';
import _ from 'lodash';

interface AdminBreadcrumbsProps {
  resourcesWithPages: { schema?: string | null; name: string }[];
}

export const AdminBreadcrumbs: React.FC<AdminBreadcrumbsProps> = ({ resourcesWithPages }) => {
  const breadCrumbResource = resourcesWithPages.find(
    (resource) => resource.name === decodeURI(window.location.hash.replace('#/', ''))
  );
  useDefineAppLocation(breadCrumbResource?.name ?? '');

  return (
    <Breadcrumb>
        {breadCrumbResource && [
          <Breadcrumb.Item
            key="resource-schema"
            name={breadCrumbResource?.name ?? 'Unknown Resource'}
            label={_.startCase(breadCrumbResource?.schema ?? 'Admin')}
          />,
          <Breadcrumb.Item
            key="resource-name"
            name={breadCrumbResource?.name ?? 'Unknown Resource'}
            label={_.startCase(breadCrumbResource?.name ?? 'Unknown Resource')}
          />
        ]}
    </Breadcrumb>
  );
};
