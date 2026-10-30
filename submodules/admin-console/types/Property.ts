import { PropertyConfig } from './Config/PropertyConfig';

export interface Property {
  name: string;
  descripton?: string;
  format: string;
  type?: string;
  enum?: string[];
  propertyConfig?: PropertyConfig;
}
