import _ from 'lodash';
import { Link } from 'react-router-dom';
import { useCreatePath } from 'react-admin';
import type { SupabaseResource } from '../types/SupabaseResource';

export const AdminHome = ({ resources }: { resources: SupabaseResource[] }) => {
  const createPath = useCreatePath();
  const resourcesBySchema = _.groupBy(resources, 'schema');

  return (
    <main className="min-h-full bg-gray-100 p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-heading text-4xl text-gray-900">DealQuest administration</h1>
        <p className="mt-3 text-gray-600">Choose a resource to manage content or application access.</p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {Object.entries(resourcesBySchema).map(([schema, schemaResources]) => (
            <section className="rounded-xl bg-white p-6 shadow-sm" key={schema}>
              <h2 className="font-heading text-2xl capitalize text-gray-900">{schema}</h2>
              <div className="mt-4 grid gap-3">
                {schemaResources.map((resource) => (
                  <Link
                    className="rounded-md border border-gray-200 px-4 py-3 font-semibold text-nsAdmin-800 hover:border-nsAdmin-600 hover:bg-gray-50"
                    key={resource.name}
                    to={createPath({ resource: resource.name, type: 'list' })}
                  >
                    {_.startCase(resource.name)}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
};
