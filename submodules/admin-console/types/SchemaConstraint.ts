export interface SchemaConstraint {
  constraint_name: string;
  constraint_type: string;
  self_schema: string;
  self_table: string;
  self_columns: string;
  foreign_schema: string | null;
  foreign_table: string | null;
  foreign_columns: string | null;
  definition: string | null;
}
