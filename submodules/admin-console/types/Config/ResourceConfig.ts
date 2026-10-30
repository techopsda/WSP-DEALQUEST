import { CustomAction } from './CustomAction';
import { PermissionConfig } from './PermissionConfig';
import { PropertyConfig } from './PropertyConfig';
import { Relation } from './Relation';

export type ResourceConfig = {
  hide?: boolean;
  customActions?: CustomAction[];
  propertiesConfig?: Record<string, PropertyConfig>;
  getPropertyLabel?: (record: any) => string;
  lookupField?: string;
  relations?: Record<string, Relation>;
  recordRepresentation?: (record: any) => string;
  propertyOrder?: string[];
  permissions?: PermissionConfig;
};
