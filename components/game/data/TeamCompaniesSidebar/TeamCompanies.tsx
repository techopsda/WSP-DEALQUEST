import { TeamWithCompanies } from '@/types/database';
import { toWords } from 'number-to-words';
import { Fragment } from 'react';

interface Props {
  companies: TeamWithCompanies[];
}

export const TeamCompanies: React.FC<Props> = ({ companies }) => {
  return (
    <>
      {companies &&
        companies.map((data, index) => (
          <Fragment key={data.id}>
            <li className="flex flex-col gap-3">
              <p className="text-lg font-semibold text-bravo">{data?.Company?.name}</p>
              <dl className="grid grid-cols-2 gap-6 text-base">
                <div className="flex flex-col gap-1">
                  <dt className="text-xs uppercase text-alpha-light-900">Year Bought</dt>
                  <dd className="text-alpha-light">
                    {data?.yearBought === 0 ? 'Practice year' : `Year ${toWords(data?.yearBought)}`}
                  </dd>
                </div>
              </dl>
            </li>
            {index !== companies.length - 1 && (
              <li>
                <hr className="border-0 border-b border-alpha" />
              </li>
            )}
          </Fragment>
        ))}
    </>
  );
};
