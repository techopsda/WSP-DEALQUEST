import { manyToMany } from '../util/manyToMany';
import { Relation } from '../types/Relation';

export const User_Role: Relation[] = manyToMany(
  { modelName: 'User', fieldName: 'roles' },
  { modelName: 'Role', fieldName: 'users' },
  {
    fromSide: {
      modelName: 'UserRole',
      fieldName: 'user',
      options: {
        fields: ['userId'],
        references: ['id']
      }
    },
    toSide: {
      modelName: 'UserRole',
      fieldName: 'role',
      options: {
        fields: ['roleId'],
        references: ['id']
      }
    }
  }
);
