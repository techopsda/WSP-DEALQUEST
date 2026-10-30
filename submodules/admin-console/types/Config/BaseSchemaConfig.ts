import { SchemaConfig } from './SchemaConfig';
import React from 'react';

export type BaseSchemaConfig = SchemaConfig & {
  icon?: React.FC<{ className?: string }>;
};
