import React from 'react';

export type CustomPage = {
  component: React.ReactNode;
  schema?: string | null;
  name: string;
  icon?: React.FC<{ className?: string }>;
};
