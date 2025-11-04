import React from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  config: any;
  data: any;
}

const RatioList = ({ config, data }: Props) => {
  const renderedRows = config.map((row: any) => {
    return (
      <li className="sm:-py-4 py-3" key={uuidv4()}>
        <div className="flex items-center space-x-4">
          <div className="min-2-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900">
              {row.label}
            </p>
            <p className="truncate text-sm text-gray-500">
              {row.subTitle && row.subTitle}
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900">
            {row.render(data)}
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className="mt-4 mb-4 ml-4 h-full rounded-lg bg-white p-4 shadow sm:p-6">
      <ul className="divided-gray-200 divide-y">{renderedRows}</ul>
    </div>
  );
};

export default RatioList;
