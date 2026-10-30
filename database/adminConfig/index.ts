import { access } from './access';
import { SchemasConfig } from '@/submodules/admin-console/types/Config/SchemasConfig';
import { publicSchema } from './public';

export const schemas: SchemasConfig = {
  access,
  public: publicSchema
};
