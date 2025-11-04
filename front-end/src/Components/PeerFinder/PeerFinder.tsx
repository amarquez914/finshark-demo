import React, { useEffect, useState } from 'react';
import type { CompanyStockPeerData } from '../../company';
import { getPeerData } from '../../api';
import PeerFinderItem from './PeerFinderItem/PeerFinderItem';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  ticker: string;
}

const PeerFinder = ({ ticker }: Props) => {
  const [peerData, setPeerData] = useState<CompanyStockPeerData[]>();
  useEffect(() => {
    const getCompanyPeerData = async () => {
      const result = await getPeerData(ticker);
      setPeerData(result);
    };
    getCompanyPeerData();
  }, [ticker]);

  return (
    <div className="m-4 inline-flex rounded-md shadow-sm">
      {peerData?.map((peer) => {
        return <PeerFinderItem data={peer} key={uuidv4()} />;
      })}
    </div>
  );
};

export default PeerFinder;
