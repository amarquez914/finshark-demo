import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { searchCompanies } from '../../api';
import type { CompanySearch } from '../../company';
import CardList from '../../Components/CardList/CardList';
import Hero from '../../Components/Hero/Hero';
import Navbar from '../../Components/Navbar/Navbar';
import ListPortfolio from '../../Components/Portfolio/ListPortfolio/ListPortfolio';
import Search from '../../Components/Search/Search';
import type { PortfolioGet } from '../../Models/Portfolio';
import { portfolioGetAPI } from '../../Services/PortfolioService';
import { toast } from 'react-toastify';

interface Props {}

const SearchPage = (props: Props) => {
  const [search, setSearch] = useState<string>('');
  const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[] | null>(
    []
  );
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string>('');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const getPortfolio = async () => {
    try {
      const response = await portfolioGetAPI();

      if (response?.data) {
        setPortfolioValues(response?.data);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.warning('Could not get portfolio values');
      }
    }
  };

  const onPortfolioCreate = (e: any) => {
    e.preventDefault();
    const exists = portfolioValues.find((value) => value === e.target[0].value);
    if (exists) return;
    const updatedPortfolio = [...portfolioValues, e.target[0].value];
    setPortfolioValues(updatedPortfolio);
    console.log(e);
  };

  const onPortfolioDelete = (e: any) => {
    e.preventDefault();
    const filteredValues = portfolioValues.filter((value) => {
      return value !== e.target[0].value;
    });
    setPortfolioValues(filteredValues);
  };

  const onSearchSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await searchCompanies(search);
    if (typeof result === 'string') {
      setServerError(result);
    } else if (Array.isArray(result.data)) {
      setSearchResult(result.data);
    }
  };

  return (
    <>
      <Search
        onSearchSubmit={onSearchSubmit}
        search={search}
        handleSearchChange={handleSearchChange}
      />
      <ListPortfolio
        portfolioValues={portfolioValues}
        onPortfolioDelete={onPortfolioDelete}
      />
      <CardList
        searchResults={searchResult}
        onPortfolioCreate={onPortfolioCreate}
      />
      {serverError && <h1>{serverError}</h1>}
    </>
  );
};

export default SearchPage;
