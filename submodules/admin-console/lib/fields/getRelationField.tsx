import {
  ChipField,
  Datagrid,
  ReferenceField,
  ReferenceManyField,
  SimpleList,
  SingleFieldList,
} from "react-admin";
import { ReferenceManyToManyField } from "../../components/react-admin/ra-relationships/ManyToMany";
import { useResources } from "../../hooks/useResources";
import { Relation } from "../../types/Config/Relation";
import { RelationStyle } from "../../types/Config/RelationStyle";
import { RelationType } from "../../types/Config/RelationType";
import { Property } from "../../types/Property";
import { getListFieldsForResource } from "./getListFieldsForResource";
import { getDefaultRelationStyle } from "../getDefaultRelationStyle";

const getRelationComponent = (relation: Relation, screen: string) => {
  const resources = useResources();
  const relationStyle =
    relation.styles?.[screen] ?? getDefaultRelationStyle(screen);
  const label = relation.label ?? "name";
  if (relationStyle === RelationStyle.Chip) {
    return (
      <SingleFieldList>
        <ChipField source={label} />
      </SingleFieldList>
    );
  }
  if (relationStyle === RelationStyle.DataGrid) {
    const resource = resources.find((r) => r.name === relation.reference);
    if (!resource) return <></>;
    return (
      <Datagrid bulkActionButtons={false} rowClick="show">
        {getListFieldsForResource(resource)}
      </Datagrid>
    );
  }
  if (relationStyle === RelationStyle.SimpleList) {
    return <SimpleList primaryText={(record) => record[label]} />;
  }
  return <></>;
};

export const getRelationField = (
  property: Property,
  relation: Relation,
  screen: string
) => {
  if (relation.type === RelationType.ManyToMany && relation.through) {
    return (
      <ReferenceManyToManyField key={property.name}
        label={property.name}
        reference={relation.reference}
        through={relation.through}
        using={relation.using}
      >
        {getRelationComponent(relation, screen)}
      </ReferenceManyToManyField>
    );
  } else if (relation.type === RelationType.OneToMany) {
    return (
      <ReferenceManyField key={property.name}
        label={property.name}
        reference={relation.reference}
        target={relation.using}
      >
        {getRelationComponent(relation, screen)}
      </ReferenceManyField>
    );
  } else if (relation.type === RelationType.OneToOne) {
    return (
      <ReferenceField key={property.name}
        label={property.name}
        reference={relation.reference}
        source={property.name}
      ></ReferenceField>
    );
  }
};
