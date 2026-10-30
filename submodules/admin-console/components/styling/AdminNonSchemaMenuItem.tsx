import { CustomPage } from '../../types/Config/CustomPage';
import { CreatePathParams } from 'react-admin';
import { Link } from 'react-router-dom';

interface AdminNonSchemaMenuItemProps {
  schemaResources: Omit<CustomPage, 'component'>[];
  createPath: (params: CreatePathParams) => string;
}

export const AdminNonSchemaMenuItem: React.FC<AdminNonSchemaMenuItemProps> = ({ schemaResources, createPath }) => {
  return (
    <ul>
      {schemaResources.map(({ name, icon }) => (
        <li
          className="|| relative -mt-px before:pointer-events-none before:absolute before:left-0 before:top-0 before:h-px before:w-full before:bg-nsAdmin-200 before:opacity-10 last:after:pointer-events-none last:after:absolute last:after:bottom-0 last:after:left-0 last:after:z-20 last:after:h-px last:after:w-full last:after:bg-nsAdmin-200 last:after:opacity-10"
          key={name}
        >
          <Link
            className={`| relative z-10 block flex items-center justify-between px-6 py-4 font-semibold text-nsAdmin-50 duration-150 hover:bg-nsAdmin-700 hover:bg-opacity-30 hover:text-white ${
              decodeURIComponent(window?.location?.hash?.replace('#/', '')) === name
                ? 'bg-nsAdmin-600 text-white '
                : ' text-nsAdmin-50 '
            }`}
            to={createPath({ resource: name, type: 'list' })}
          >
            {name}
            {icon && icon({ className: 'h-5 w-5' })}
          </Link>
        </li>
      ))}
    </ul>
  );
};
