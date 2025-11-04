import React from 'react';
import type { CompanyTenK } from '../../../company';
import { Link } from 'react-router-dom';

interface Props {
  tenK: CompanyTenK;
}

const TenKFinderItem = ({ tenK }: Props) => {
  const fillingDate = new Date(tenK.fillingDate).getFullYear();
  return (
    <Link
      reloadDocument
      to={tenK.finalLink}
      type="button"
      className="text-md bg-lightGreen inline-flex items-center rounded-md p-4 text-white"
    >
      10K - {tenK.symbol} - {fillingDate}
    </Link>
  );
};

export default TenKFinderItem;
