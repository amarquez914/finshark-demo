import React from 'react';
import { testIncomeStatementData } from './testData';
import { v4 as uuidv4 } from 'uuid';

const data = testIncomeStatementData;

interface Props {
  config: any;
  data: any;
}

const Table = ({ config, data }: Props) => {
  const renderedRows = data.map((company: any) => {
    return (
      <tr key={uuidv4()}>
        {config.map((val: any) => {
          return (
            <td className="p-4 text-sm font-normal whitespace-nowrap text-gray-900">
              {val.render(company)}
            </td>
          );
        })}
      </tr>
    );
  });

  const renderedHeaders = config.map((config: any) => {
    return (
      <th
        className="p-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
        key={config.label}
      >
        {config.label}
      </th>
    );
  });
  return (
    <div className="rounded-lg bg-white p-4 shadow sm:p-6 xl:p-8">
      <table>
        <thead className="m-5 min-w-full divide-y divide-gray-200">
          <tr>{renderedHeaders}</tr>
        </thead>
        <tbody>{renderedRows}</tbody>
      </table>
    </div>
  );
};

export default Table;
