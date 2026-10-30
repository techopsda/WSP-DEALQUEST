import { SchemasConfig } from '../types/Config/SchemasConfig';
import { SchemaConstraint } from '../types/SchemaConstraint';
import { SupabaseResource } from '../types/SupabaseResource';

export const getResources = async (schemasConfig?: SchemasConfig) => {
  const resources: SupabaseResource[] = [];

  const response = await fetch('/api/admin/resources', { cache: 'no-store' });
  const rawResponse = await response.text();

  let responseData: Record<string, any> | null = null;
  if (rawResponse) {
    try {
      responseData = JSON.parse(rawResponse);
    } catch {
      throw new Error(
        `Admin resources API returned invalid JSON (status ${response.status}). ${rawResponse.slice(0, 200) || 'Empty response.'}`
      );
    }
  }

  if (!response.ok) {
    throw new Error(responseData?.message ?? `Unable to load admin resources (status ${response.status}).`);
  }

  const schemaData = responseData?.schemaData ?? [];
  const schemaDefinitions = responseData?.schemaDefinitions ?? {};

  Object.entries(schemaDefinitions).forEach(([schema, definitions]) => {
      const supabaseDefinitions = definitions as Record<string, any>;
      const supabaseTables = Object.keys(supabaseDefinitions);

      supabaseTables.forEach((tableName) => {
        const supabaseProperties = supabaseDefinitions[tableName].properties;
        const supabasePropertyNames = Object.keys(supabaseProperties);
        const thisResourceConstraints = (schemaData ?? []).filter(
          (constraint: SchemaConstraint) =>
            (constraint.self_schema === schema && constraint.self_table === tableName) ||
            (constraint.foreign_schema === schema && constraint.foreign_table === tableName)
        );
        const resourceConfig = schemasConfig?.[schema]?.resourcesConfig?.[tableName];

        resources.push({
          name: tableName,
          properties: supabasePropertyNames.map((supabasePropertyName) => {
            const propertyConfig = resourceConfig?.propertiesConfig?.[supabasePropertyName];
            return {
              name: supabasePropertyName,
              ...supabaseProperties[supabasePropertyName],
              format: propertyConfig?.isFile ? 'file' : supabaseProperties[supabasePropertyName]?.format,
              propertyConfig: propertyConfig
            };
          }),
          schema,
          constraints: thisResourceConstraints.map((constraint: SchemaConstraint) => ({
            ...constraint,
            self_columns: JSON.parse(constraint.self_columns ?? '[]'),
            foreign_columns: JSON.parse(constraint.foreign_columns ?? '[]')
          })),
          resourceConfig: resourceConfig
        });
      });
    });

  return resources;
};
