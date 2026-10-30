import { BoltIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Sidebar, SidebarProps } from 'react-admin';

export const AdminSideBar: React.FC<SidebarProps> = (props) => {
  return (
    <Sidebar {...props} size={288}>
      <div className="relative flex h-full overflow-y-auto bg-nsAdmin-800">
        <aside className="flex min-h-full w-full flex-col">
          <nav className="flex-1">
            <ul className="-gap-px relative flex flex-col">{props.children}</ul>
          </nav>
          <Link
            href="https://northlink.digital"
            className="flex-0 group mt-auto flex items-center gap-4 bg-nsAdmin-900 p-6"
          >
            <div className="flex aspect-square w-12 items-center justify-center rounded-full border border-yellow-500">
              <BoltIcon className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="flex flex-col gap-2 leading-none text-white">
              <p className="text-sm font-semibold">Powered by NorthStar</p>
              <p className="text-xs">
                from <span className="group-hover:underline">NorthLink Digital</span>
              </p>
            </div>
          </Link>
        </aside>
      </div>
    </Sidebar>
  );
};
