import React from 'react';
import type { CompanyStockPeerData } from '../../../company';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  data: CompanyStockPeerData;
}

const PeerFinderItem = ({ data }: Props) => {
  return (
    <Link
      key={uuidv4()}
      reloadDocument
      to={`/company/${data.symbol}/company-profile`}
      type="button"
      className="inline-flex items-center rounded-l-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
    >
      {data.symbol}
    </Link>
  );
};

export default PeerFinderItem;
