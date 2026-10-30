import { oneToMany } from './oneToMany';
import _ from 'lodash';

export const userAuditRelation = (fromModel: string, type: string) => {
  return oneToMany(
    {
      modelName: fromModel,
      fieldName: `${type}By`,
      options: {
        fields: [`${type}ById`],
        references: ['id'],
        optional: true,
        name: `${fromModel}${_.upperFirst(type)}By`
      }
    },
    {
      modelName: 'User',
      fieldName: `${fromModel}${_.upperFirst(type)}`
    }
  );
};
