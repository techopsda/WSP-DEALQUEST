import { useResourceAppLocation } from '../react-admin/ra-navigation';
import { AdminNonSchemaMenuItem } from './AdminNonSchemaMenuItem';
import { AdminSchemaMenuItem } from './AdminSchemaMenuItem';
import _ from 'lodash';
import { MenuProps, useCreatePath } from 'react-admin';
import { Link } from 'react-router-dom';

interface AdminMenuProps {
  resourcesWithPages: { schema?: string | null; name: string; icon?: React.FC<{ className?: string }> }[];
}

export const AdminMenu: React.FC<MenuProps & AdminMenuProps> = ({ resourcesWithPages }) => {
  const splitResources = _.groupBy(resourcesWithPages, 'schema');
  const createPath = useCreatePath();
  const currentResource = useResourceAppLocation();

  const resourcesWithoutSchemas = Object.keys(splitResources).filter(
    (schema) => schema === 'undefined' || schema === 'null'
  );
  const resourcesWithSchemas = Object.keys(splitResources).filter(
    (schema) => schema !== 'undefined' && schema !== 'null'
  );

  return (
    <>
      <li className="border-b border-nsAdmin-700">
        <Link
          className="block px-6 py-4 font-semibold text-nsAdmin-50 hover:bg-nsAdmin-700 hover:text-white"
          to="/"
        >
          Overview
        </Link>
      </li>
      {resourcesWithoutSchemas.map((schema) => {
        const schemaResources = splitResources?.[schema];

        return <AdminNonSchemaMenuItem key={schema} schemaResources={schemaResources} createPath={createPath} />;
      })}
      {resourcesWithSchemas.map((schema) => {
        const schemaResources = splitResources?.[schema];

        return (
          <AdminSchemaMenuItem
            key={schema}
            schema={schema}
            schemaResources={schemaResources}
            createPath={createPath}
            currentResource={currentResource}
          />
        );
      })}
    </>
  );
};
