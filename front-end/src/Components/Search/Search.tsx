import React, { type ChangeEvent, type FormEvent, type JSX } from 'react';

interface Props {
  onSearchSubmit: (e: FormEvent<HTMLFormElement>) => void;
  search: string;
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<Props> = ({
  onSearchSubmit,
  search,
  handleSearchChange,
}: Props): JSX.Element => {
  return (
    <section className="relative bg-gray-100">
      <div className="mx-auto max-w-4xl space-y-6">
        <form
          className="form bg-darkBlue relative flex w-full flex-col space-y-4 rounded-lg p-10 md:flex-row md:space-y-0 md:space-x-3"
          onSubmit={onSearchSubmit}
        >
          <input
            type="text"
            className="flex-1 rounded-lg border-2 bg-white p-3 placeholder-black focus:outline-none"
            id="search-input"
            placeholder="Search companies"
            value={search}
            onChange={handleSearchChange}
          />
        </form>
      </div>
    </section>
  );
};

export default Search;

// <>
//   <form onSubmit={onSearchSubmit}>
//     <input value={search} onChange={(e) => handleSearchChange(e)} />
//   </form>
// </>
