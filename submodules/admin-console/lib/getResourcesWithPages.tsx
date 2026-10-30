import { AdminConfig } from '../types/Config/AdminConfig';
import { CustomPage } from '../types/Config/CustomPage';
import { SupabaseResource } from '../types/SupabaseResource';
import { TableCellsIcon } from '@heroicons/react/24/outline';

export const getResourcesWithPages = (resources: SupabaseResource[], config?: AdminConfig) => {
  const resourcesWithPages: (CustomPage | { name: string; schema?: string | null })[] = [...resources];

  if (config?.dashboard?.enabled) {
    resourcesWithPages.push({
      name: 'Dashboard',
      schema: null,
      icon: () => <TableCellsIcon className="h-5 w-5" />
    });
  }

  if (config?.customPages) {
    resourcesWithPages.push(...config?.customPages);
  }

  if (config?.functions) {
    const functions = config?.functions ? Object.keys(config?.functions) : [];

    resourcesWithPages.push(
      ...functions.map((functionName) => {
        return { schema: 'Functions', name: functionName };
      })
    );
  }

  return resourcesWithPages;
};
