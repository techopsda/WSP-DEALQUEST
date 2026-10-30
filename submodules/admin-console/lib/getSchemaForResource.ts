import { SupabaseResource } from '../types/SupabaseResource';

export const getSchemaForResource = (resource: string, resources: SupabaseResource[]) => {
  const resourceObject = resources.find((r) => r.name === resource);
  return resourceObject?.schema;
};
