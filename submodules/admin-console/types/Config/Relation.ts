import { RelationStyle } from './RelationStyle';
import { RelationType } from './RelationType';

export interface Relation {
  type: RelationType;
  styles?: Record<string, RelationStyle>;
  reference: string;
  through?: string;
  using: string;
  label?: string;
}
