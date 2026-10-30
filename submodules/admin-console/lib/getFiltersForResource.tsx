import _ from 'lodash';
import { AutocompleteInput, BooleanInput, DateTimeInput, NumberInput, ReferenceInput, TextInput } from 'react-admin';
import { SupabaseResource } from '../types/SupabaseResource';

export const getFiltersForResource = (resource: SupabaseResource, resources: SupabaseResource[]) => {
  const UUIDValidator = (mightBeUUID: string) => {
    const uuidRegex = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[1-5][a-fA-F0-9]{3}-[89abAB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}$/;
    return uuidRegex.test(mightBeUUID) ? undefined : 'Invalid UUID format';
  };

  const referenceFields = resource.constraints.filter(
    (constraint) =>
      constraint.constraint_type === 'f' &&
      constraint.self_table === resource.name &&
      constraint.self_schema === resource.schema &&
      constraint.foreign_table &&
      resource.properties.some((property) => constraint.self_columns[0] === property.name)
  );

  // Filter out those fields that are references - they'll be added in later
  const filteredProperties = resource.properties.filter(
    (property) => !referenceFields.some((constraint) => constraint.self_columns[0] === property.name)
  );

  const stringFilters = filteredProperties
    .filter((p) => p.type === 'string' && p.format === 'text')
    .map((p) => <TextInput key={p?.name} label={p.name} source={`${p.name}@ilike`} size="small" />);
  const uuidFilters = filteredProperties
    .filter((p) => p.type === 'string' && p.format === 'uuid')
    .map((p) => (
      <TextInput key={p?.name} label={p.name} source={`${p.name}@eq`} size="small" validate={UUIDValidator} />
    ));
  const dateFilters = filteredProperties
    .filter((p) => p.type === 'string' && p.format.includes('timestamp'))
    .map((p) => <DateTimeInput key={p?.name} label={p.name} source={`${p.name}`} size="small" />);
  const booleanFilters = filteredProperties
    .filter((p) => p.type === 'boolean' && p.format.includes('boolean'))
    .map((p) => <BooleanInput key={p?.name} label={p.name} source={`${p.name}@eq`} size="small" />);
  const numberFilters = filteredProperties
    .filter((p) => p.type === 'string' && p.format === 'bool')
    .map((p) => <NumberInput key={p?.name} label={p.name} source={`${p.name}@ilike`} size="small" />);

  const referenceFilters = referenceFields.map((constraint) => {
    const foreignTableResource = resources.find((resource) => resource.name === constraint.foreign_table);
    const resourceLookupField = foreignTableResource?.resourceConfig?.lookupField ?? 'name';

    if (foreignTableResource?.schema === resource.schema) {
      return (
        <ReferenceInput
          key={constraint.self_columns[0]}
          label={constraint.self_columns[0]}
          source={constraint.self_columns[0]}
          queryOptions={{
            select: (query) => ({ ...query, data: _.uniqBy(query?.data, `${constraint?.self_columns[0]}.id`) })
          }}
          reference={`${resource?.name}?&select=id,${constraint?.self_columns[0]}:${constraint?.foreign_table}%21${resource?.name}_${constraint.self_columns[0]}_fkey!inner(id, ${resourceLookupField})`}
        >
          <AutocompleteInput
            optionText={`${constraint?.self_columns[0]}.${resourceLookupField}`}
            optionValue={`${constraint?.self_columns[0]}.id`}
            filterToQuery={(searchText: string) => ({
              [`${constraint?.self_columns[0]}.${resourceLookupField}@`]: `ilike.%${searchText}%`
            })}
          />
        </ReferenceInput>
      );
    } else {
      return (
        <ReferenceInput
          key={foreignTableResource?.name}
          label={foreignTableResource?.name}
          source={constraint?.self_columns[0]}
          queryOptions={{
            select: (query) => ({ ...query, data: _.uniqBy(query?.data, 'id') })
          }}
          reference={foreignTableResource?.name ?? ''}
        >
          <AutocompleteInput
            optionText={resourceLookupField}
            optionValue="id"
            filterToQuery={(searchText: string) => ({
              [`${resourceLookupField}@`]: `ilike.%${searchText}%`
            })}
          />
        </ReferenceInput>
      );
    }
  });

  return [...stringFilters, ...uuidFilters, ...dateFilters, ...booleanFilters, ...numberFilters, ...referenceFilters];
};
