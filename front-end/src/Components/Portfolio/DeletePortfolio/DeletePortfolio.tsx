import React, { type SyntheticEvent } from 'react';

interface Props {
  onPortfolioDelete: (e: SyntheticEvent) => void;
  portfolioValue: string;
}

const DeletePortfolio = ({ onPortfolioDelete, portfolioValue }: Props) => {
  return (
    <form onSubmit={onPortfolioDelete}>
      <input type="text" hidden={true} value={portfolioValue} />
      <button className="block w-full rounded-lg border-2 border-red-500 bg-red-500 py-3 text-white duration-200 hover:bg-white hover:text-red-500">
        X
      </button>
    </form>
  );
};

export default DeletePortfolio;
