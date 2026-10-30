import { AutocompleteArrayInput, required } from 'react-admin';
import { ReferenceManyToManyInput } from '../../components/react-admin/ra-relationships/ManyToMany';
import { Relation } from '../../types/Config/Relation';
import { RelationType } from '../../types/Config/RelationType';
import { Property } from '../../types/Property';

export const getRelationInput = (property: Property, relation: Relation) => {
  if (relation.type === RelationType.ManyToMany && relation.through) {
    const label = relation.label ?? 'name';
    const filter = `${label}@ilke`;
    return (
      <ReferenceManyToManyInput
        source="id"
        reference={relation.reference}
        through={relation.through}
        using={relation.using}
      >
        <AutocompleteArrayInput
          label={property.name}
          validate={required()}
          optionText={label}
          fullWidth
          filterToQuery={(searchText: string) => ({ filter: searchText })}
        />
      </ReferenceManyToManyInput>
    );
  }
};
