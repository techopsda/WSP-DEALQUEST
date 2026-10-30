import { CustomPage } from './CustomPage';
import { DashboardConfig } from './DashboardConfig';
import { FunctionsConfig } from './FunctionsConfig';
import { SchemasConfig } from './SchemasConfig';

export type AdminConfig = {
  schemas?: SchemasConfig;
  customPages?: CustomPage[];
  functions?: FunctionsConfig;
  dashboard?: DashboardConfig;
};
