import _ from "lodash";
import {
  AutocompleteInput,
  BooleanInput,
  DateInput,
  DateTimeInput,
  FileField,
  FileInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  TextInput,
  TimeInput,
} from "react-admin";
import { JsonInput } from "react-admin-json-view";
import { useEnums } from "../../hooks/useEnums";
import { RelationStyle } from "../../types/Config/RelationStyle";
import { Property } from "../../types/Property";
import { SupabaseResource } from "../../types/SupabaseResource";
import { getDefaultRelationStyle } from "../getDefaultRelationStyle";
import { getRelationInput } from "./getRelationInput";

export const determineFieldInput = (
  property: Property,
  resource: SupabaseResource,
  resources: SupabaseResource[]
) => {
  const allEnums = useEnums();

  const formatTime = (time: any) => {
    if (time !== undefined && time !== null) {
      let split_time = time.split("+");
      return split_time[0];
    }
  };

  const parseTime = (time: any) => {
    const date = new Date();
    const utcOffset = date.getTimezoneOffset(); // get the UTC offset in hours

    const hours = Math.ceil(utcOffset / 60);
    const minutes = utcOffset % 60;

    const appendTime = `${utcOffset <= 0 ? "+" : "-"}${
      hours < 10 ? "0" : ""
    }${Math.abs(hours)}:${Math.abs(minutes)}`;

    return `${time}${appendTime}`;
  };

  // Handle the case where the property is a foreign key (eg, createdById - go and fetch the name of the relation)
  const outgoingFKConstraint = (resource?.constraints ?? []).find(
    (c) =>
      c.constraint_type === "f" &&
      c.self_table === resource.name &&
      c.self_schema === resource.schema &&
      c.self_columns[0] === property.name
  );
  if (outgoingFKConstraint && outgoingFKConstraint.foreign_table) {
    const foreignTableResource = resources.find(
      (resource) => resource.name === outgoingFKConstraint.foreign_table
    );
    const resourceLookupField =
      foreignTableResource?.resourceConfig?.lookupField ?? "name";

    return (
      <ReferenceInput
        label={property.name}
        source={property.name}
        reference={outgoingFKConstraint.foreign_table ?? ""}
      >
        <AutocompleteInput
          optionText={resourceLookupField}
          filterToQuery={(searchText: string) => ({
            [`${resourceLookupField}@ilike`]: searchText,
          })}
        />
      </ReferenceInput>
    );
  }

  const filteredEnumObjects = _.filter(
    allEnums,
    (enumObject) =>
      enumObject.table_schema === resource.schema &&
      enumObject.table_name === resource.name &&
      enumObject.column_name === property.name
  );
  if (filteredEnumObjects.length > 0) {
    return (
      <SelectInput
        label={property.name}
        source={property.name}
        choices={filteredEnumObjects.map((enumObject) => {
          return { id: enumObject.enumlabel, name: enumObject.enumlabel };
        })}
      />
    );
  }
  if (property.format === "file") {
    return (
      <>
        <FileInput label={property.name} source={property.name} multiple={true}>
          <FileField source="src" title="title" target="_blank" />
        </FileInput>
      </>
    );
  }
  if (property.format === "jsonb" || property.format === "json") {
    return (
      <JsonInput
        source={property.name}
        reactJsonOptions={{ name: property.name }}
      />
    );
  }
  if (property.format.includes("int") || property.format === "numeric") {
    return (
      <NumberInput source={property.name} label={property.name} step={1} />
    );
  }
  if (property.format === "double precision" || property.format === "real") {
    return (
      <NumberInput
        source={property.name}
        label={property.name}
        inputMode="decimal"
      />
    );
  }
  if (property.format === "date") {
    return <DateInput source={property.name} label={property.name} />;
  }
  if (property.format === "time without time zone") {
    return (
      <TimeInput
        source={property.name}
        format={(v: any) => v}
        parse={(v: any) => v}
        label={property.name}
      />
    );
  }
  if (property.format === "time with time zone") {
    return (
      <TimeInput
        source={property.name}
        format={(v) => formatTime(v)}
        parse={(v) => parseTime(v)}
        label={property.name}
      />
    );
  }

  if (property.format.includes("stamp")) {
    return <DateTimeInput source={property.name} label={property.name} />;
  }
  if (property.format === "boolean") {
    return <BooleanInput source={property.name} label={property.name} />;
  }
  const relation = resource?.resourceConfig?.relations?.[property.name];
  const relationStyle =
    relation?.styles?.["edit"] ?? getDefaultRelationStyle("edit");
  if (relation && relationStyle !== RelationStyle.Hidden) {
    return getRelationInput(property, relation);
  }

  return <TextInput label={property.name} source={property.name} />;
};
