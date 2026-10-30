import { ResourceConfig } from './Config/ResourceConfig';
import { Property } from './Property';
import { SchemaConstraint } from './SchemaConstraint';

export interface SupabaseResource {
  name: string;
  properties: Property[];
  schema: string;
  constraints: SchemaConstraint[];
  resourceConfig?: ResourceConfig;
}
