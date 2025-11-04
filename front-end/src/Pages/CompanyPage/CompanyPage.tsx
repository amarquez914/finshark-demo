import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { CompanyProfile } from '../../company';
import { getCompanyProfile } from '../../api';
import Sidebar from '../../Components/Sidebar/Sidebar';
import CompanyDashboard from '../../Components/CompanyDashboard/CompanyDashboard';
import Tile from '../../Components/Tile/Tile';
import Spinner from '../../Components/Spinner/Spinner';
import PeerFinder from '../../Components/PeerFinder/PeerFinder';
import TenKFinder from '../../Components/TenKFinder/TenKFinder';

interface Props {}

const CompanyPage = (props: Props) => {
  let { ticker } = useParams();
  const [company, setCompany] = useState<CompanyProfile>();

  useEffect(() => {
    const getProfileInit = async () => {
      if (typeof ticker === 'string') {
        const result = await getCompanyProfile(ticker);

        if (result) setCompany(result);
      }
    };
    getProfileInit();
  }, []);

  return (
    <>
      {company ? (
        <div className="ct-docs-disable-sidebar-content relative flex w-full overflow-x-hidden">
          <Sidebar />
          <CompanyDashboard ticker={ticker!}>
            <Tile title="Company name" subtitle={company.companyName} />
            <Tile
              title="Price"
              subtitle={new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(company.price)}
            />
            <Tile title="Sector" subtitle={company.sector} />
            <Tile title="Currency" subtitle={company.currency} />
            <PeerFinder ticker={company.symbol} />
            <TenKFinder ticker={company.symbol} />
            {/* <p className="text-medium m-4 mt-1 rounded bg-white p-3 text-gray-900 shadow">
              {company.description}
            </p> */}
          </CompanyDashboard>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default CompanyPage;
