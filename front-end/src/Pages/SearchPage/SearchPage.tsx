import React, {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import { searchCompanies } from '../../api';
import type { CompanySearch } from '../../company';
import CardList from '../../Components/CardList/CardList';
import Hero from '../../Components/Hero/Hero';
import Navbar from '../../Components/Navbar/Navbar';
import ListPortfolio from '../../Components/Portfolio/ListPortfolio/ListPortfolio';
import Search from '../../Components/Search/Search';
import type { PortfolioGet } from '../../Models/Portfolio';
import {
  portfolioAddAPI,
  portfolioADeletePI as portfolioADeleteAPI,
  portfolioGetAPI,
} from '../../Services/PortfolioService';
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

  useEffect(() => {
    getPortfolio();
  }, []);

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

  const onPortfolioCreate = async (e: any) => {
    try {
      e.preventDefault();
      const response = await portfolioAddAPI(e.target[0].value);

      if (response?.status === 204) {
        toast.success('Stock added to portfolio!');
        getPortfolio();
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.warning('Could not create portfolio item');
      }
    }
  };

  const onPortfolioDelete = async (e: any) => {
    try {
      e.preventDefault();
      const response = await portfolioADeleteAPI(e.target[0].value);

      if (response?.status === 200) {
        toast.success('Stock deleted from portfolio!');
        getPortfolio();
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.warning('Could not delete portfolio item');
      }
    }
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
        portfolioValues={portfolioValues!}
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
