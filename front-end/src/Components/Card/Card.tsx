import React, { type JSX, type SyntheticEvent } from 'react';
import './Card.css';
import type { CompanySearch } from '../../company';
import AddPortfolio from '../Portfolio/AddPortfolio/AddPortfolio';
import { Link } from 'react-router-dom';

interface Props {
  id: string;
  searchResult: CompanySearch;
  onPortfolioCreate: (e: SyntheticEvent) => void;
}

const Card: React.FC<Props> = ({
  id,
  searchResult,
  onPortfolioCreate,
}: Props): JSX.Element => {
  return (
    <div
      className="flex w-full flex-col items-center justify-between rounded-lg bg-slate-100 p-6 md:flex-row"
      key={id}
      id={id}
    >
      <Link
        to={`/company/${searchResult.symbol}/company-profile`}
        className="text-center font-bold text-black md:text-left"
      >
        {searchResult.name} ({searchResult.symbol})
      </Link>
      <p className="text-black">{searchResult.currency}</p>
      <p className="font-bold text-black">
        {searchResult.exchange} - {searchResult.exchangeFullName}
      </p>
      <AddPortfolio
        onPortfolioCreate={onPortfolioCreate}
        symbol={searchResult.symbol}
      />
    </div>
  );
};

export default Card;
