import { PrismaModel } from 'schemix';
import { StringFieldOptions } from 'schemix/dist/typings/prisma-type-options';
import { relations } from '../_relations';
import { createdModifiedModels } from '../_relations';
import { userAuditRelation } from './userAuditRelation';

export const withRelations = (model: PrismaModel) => {
  let enhancedModel = model;
  let thisModelRelations = relations;

  // Auto insert CreateAt/ModifiedAt timestamps and CreatedBy/ModifiedBy relations if requested
  if (
    model.name &&
    Object.values(createdModifiedModels).some((schemaModels) => model.name && schemaModels.includes(model.name))
  ) {
    console.log('Adding created/modified fields to model: ', model.name);
    enhancedModel = enhancedModel
      .dateTime('createdAt', {
        optional: true,
        raw: `@default(dbgenerated("(now() AT TIME ZONE 'utc'::text)")) @database.Timestamptz(6)`
      })
      .dateTime('modifiedAt', {
        optional: true,
        raw: `@default(dbgenerated("(now() AT TIME ZONE 'utc'::text)")) @database.Timestamptz(6)`
      });
    thisModelRelations.push(...userAuditRelation(model.name, 'created'));
    thisModelRelations.push(...userAuditRelation(model.name, 'modified'));
  }

  // If this is the User model, auto add the back relations for all CreatedBy/ModifiedBy relations
  if (model.name === 'User') {
    for (const schema of Object.keys(createdModifiedModels)) {
      const thisSchemaModels = createdModifiedModels[schema];
      for (const createdModifiedModel of thisSchemaModels) {
        thisModelRelations.push(...userAuditRelation(createdModifiedModel, 'created'));
        thisModelRelations.push(...userAuditRelation(createdModifiedModel, 'modified'));
      }
    }
  }

  const fromRelations = thisModelRelations.filter((relation) => relation.fromModelName === model.name);

  if (model.name === 'User') {
    console.log('fromRelations', fromRelations);
  }

  fromRelations.forEach((relation) => {
    enhancedModel = enhancedModel.relation(relation.fromField, new PrismaModel(relation.toModelName), relation.options);
    (relation.options?.fields ?? []).forEach((field) => {
      let thisFieldOptions: StringFieldOptions = {
        raw: '@database.Uuid'
      };
      if (relation.unique) {
        thisFieldOptions.unique = true;
      }
      if (relation.options?.optional) {
        thisFieldOptions.optional = true;
      }
      enhancedModel = enhancedModel.string(field, thisFieldOptions);
    });
  });

  return enhancedModel;
};
