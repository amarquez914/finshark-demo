import React, { useEffect, useState } from 'react';
import type { CompanyTenK } from '../../company';
import { getTenK } from '../../api';
import TenKFinderItem from './TenKFinderItem/TenKFinderItem';
import Spinner from '../Spinner/Spinner';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  ticker: string;
}

const TenKFinder = ({ ticker }: Props) => {
  const [tenK, setTenK] = useState<CompanyTenK[]>();

  useEffect(() => {
    const controller = new AbortController();
    const getTenKData = async () => {
      const result = await getTenK(ticker, controller);
      setTenK(result);
    };
    getTenKData();
    return () => {
      console.log('clean up');
      controller.abort();
    };
  }, [ticker]);

  return (
    <div className="m-4 inline-flex rounded-md shadow-sm">
      {tenK ? (
        tenK
          .slice(0, 5)
          .filter((item) => {
            return item.formType.toLowerCase() === '10-k';
          })
          .map((tenk) => {
            return <TenKFinderItem tenK={tenk} key={uuidv4()} />;
          })
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default TenKFinder;
