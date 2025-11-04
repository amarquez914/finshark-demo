import React, { type SyntheticEvent } from 'react';

interface Props {
  onPortfolioCreate: (e: SyntheticEvent) => void;
  symbol: string;
}

const AddPortfolio = ({ onPortfolioCreate, symbol }: Props) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-end space-y-2 space-x-4 md:flex-row md:space-y-0">
      <form onSubmit={onPortfolioCreate}>
        <input readOnly={true} hidden={true} value={symbol} />
        <button
          type="submit"
          className="bg-darkBlue rounded-lg p-2 px-8 text-white hover:opacity-70 focus:outline-none"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddPortfolio;
