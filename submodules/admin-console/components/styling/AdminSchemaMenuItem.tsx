import { CustomPage } from '../../types/Config/CustomPage';
import { AppLocation } from '../react-admin/ra-navigation';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import _ from 'lodash';
import { CreatePathParams } from 'react-admin';
import { Link } from 'react-router-dom';

interface AdminSchemaMenuItemProps {
  schema: string;
  schemaResources: (CustomPage | { schema?: string | null; name: string })[];
  createPath: (params: CreatePathParams) => string;
  currentResource: AppLocation | null;
}

export const AdminSchemaMenuItem: React.FC<AdminSchemaMenuItemProps> = ({
  schema,
  schemaResources,
  createPath,
  currentResource
}) => {
  return (
    <Disclosure className="relative -mt-px border-t border-nsAdmin-700" as="li" key={schema} defaultOpen>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full items-center justify-between px-6 py-4">
            <span className="font-semibold text-nsAdmin-50">{_.capitalize(schema)}</span>
            <ChevronDownIcon
              className={clsx(open ? '-rotate-180' : 'rotate-0', 'h-4 w-4 transform text-nsAdmin-200')}
              aria-hidden="true"
            />
          </Disclosure.Button>

          <hr className="border-nsAdmin-700" />

          <Disclosure.Panel as="ul" className="">
            {schemaResources.map(({ name }) => (
              <li
                className="|| relative -mt-px before:pointer-events-none before:absolute before:left-0 before:top-0 before:h-px before:w-full before:bg-nsAdmin-200 before:opacity-10 last:after:pointer-events-none last:after:absolute last:after:bottom-0 last:after:left-0 last:after:z-20 last:after:h-px last:after:w-full last:after:bg-nsAdmin-200 last:after:opacity-10"
                key={name}
              >
                <Link
                  className={`| relative z-10 block py-4 pl-9 pr-6 duration-150 hover:bg-nsAdmin-700 hover:bg-opacity-30 hover:text-white ${
                    currentResource?.path === name ? 'bg-nsAdmin-600 text-white ' : ' text-nsAdmin-50 '
                  }`}
                  to={createPath({ resource: name, type: 'list' })}
                >
                  {name}
                </Link>
              </li>
            ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
