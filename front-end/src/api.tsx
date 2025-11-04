import axios, { type AxiosResponse } from 'axios';
import type {
  CompanyBalanceSheet,
  CompanyCashFlow,
  CompanyIncomeStatement,
  CompanyKeyMetrics,
  CompanyStockPeerData,
  CompanyProfile,
  CompanySearch,
  CompanyTenK,
} from './company';
import { formatISODate } from './Helpers/DateFormatting';

interface SearchResponse {
  data: CompanySearch[];
}

export const searchCompanies = async (query: string) => {
  try {
    const data = await axios.get<SearchResponse>(
      `https://financialmodelingprep.com/stable/search-name?query=${query}&limit=10&exchange=NASDAQ&apikey=${import.meta.env.VITE_REACT_APP_API_KEY}`
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('Unexpected error: ', error);
      return 'An unexpected error has occurred.';
    }
  }
};

export const getCompanyProfile = async (query: string) => {
  try {
    const profile = await axios
      .get<
        CompanyProfile[]
      >(`https://financialmodelingprep.com/stable/profile?symbol=${query}&apikey=${import.meta.env.VITE_REACT_APP_API_KEY}`)
      .then((response: AxiosResponse<CompanyProfile[]>) => {
        const result: CompanyProfile = response.data[0];
        return result;
      });

    return profile;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message from API: ', error.message);
      // return error.message;
    } else {
      console.log('Unexpected error: ', error);
    }
  }
};

export const getKeyMetrics = async (query: string) => {
  try {
    const profile = await axios
      .get<
        CompanyKeyMetrics[]
      >(`https://financialmodelingprep.com/stable/key-metrics-ttm?symbol=${query}&apikey=${import.meta.env.VITE_REACT_APP_API_KEY}`)
      .then((response: AxiosResponse<CompanyKeyMetrics[]>) => {
        const result: CompanyKeyMetrics = response.data[0];
        return result;
      });

    return profile;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message from API: ', error.message);
      // return error.message;
    } else {
      console.log('Unexpected error: ', error);
    }
  }
};

export const getIncomeStatement = async (query: string) => {
  try {
    const profile = await axios
      .get<
        CompanyIncomeStatement[]
      >(`https://financialmodelingprep.com/stable/income-statement?symbol=${query}&apikey=${import.meta.env.VITE_REACT_APP_API_KEY}`)
      .then((response: AxiosResponse<CompanyIncomeStatement[]>) => {
        const result: CompanyIncomeStatement[] = response.data;
        return result;
      });

    return profile;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message from API: ', error.message);
      // return error.message;
    } else {
      console.log('Unexpected error: ', error);
    }
  }
};

export const getBalanceSheet = async (query: string) => {
  try {
    const profile = await axios
      .get<
        CompanyBalanceSheet[]
      >(`https://financialmodelingprep.com/stable/balance-sheet-statement?symbol=${query}&apikey=${import.meta.env.VITE_REACT_APP_API_KEY}`)
      .then((response: AxiosResponse<CompanyBalanceSheet[]>) => {
        const result: CompanyBalanceSheet = response.data[0];
        return result;
      });

    return profile;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message from API: ', error.message);
      // return error.message;
    } else {
      console.log('Unexpected error: ', error);
    }
  }
};

export const getCashFlow = async (query: string) => {
  try {
    const profile = await axios
      .get<
        CompanyCashFlow[]
      >(`https://financialmodelingprep.com/stable/cash-flow-statement?symbol=${query}&apikey=${import.meta.env.VITE_REACT_APP_API_KEY}`)
      .then((response: AxiosResponse<CompanyCashFlow[]>) => {
        const result: CompanyCashFlow[] = response.data;
        return result;
      });

    return profile;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message from API: ', error.message);
      // return error.message;
    } else {
      console.log('Unexpected error: ', error);
    }
  }
};

export const getPeerData = async (query: string) => {
  try {
    const profile = await axios
      .get<
        CompanyStockPeerData[]
      >(`https://financialmodelingprep.com/stable/stock-peers?symbol=${query}&apikey=${import.meta.env.VITE_REACT_APP_API_KEY}`)
      .then((response: AxiosResponse<CompanyStockPeerData[]>) => {
        const result: CompanyStockPeerData[] = response.data;
        return result;
      });

    return profile;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message from API: ', error.message);
      // return error.message;
    } else {
      console.log('Unexpected error: ', error);
    }
  }
};

export const getTenK = async (query: string, controller: AbortController) => {
  try {
    const toDate = new Date();
    const fromDate = new Date();
    fromDate.setFullYear(toDate.getFullYear() - 1);
    fromDate.setDate(toDate.getDate() + 1);
    const tenK = await axios
      .get<
        CompanyTenK[]
      >(`https://financialmodelingprep.com/stable/sec-filings-search/symbol?symbol=${query}&from=${formatISODate(fromDate)}&to=${formatISODate(toDate)}&page=0&limit=10&apikey=${import.meta.env.VITE_REACT_APP_API_KEY}`, { signal: controller.signal })
      .then((response: AxiosResponse<CompanyTenK[]>) => {
        const result: CompanyTenK[] = response.data;
        return result;
      });

    return tenK;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message from API: ', error.message);
      // return error.message;
    } else {
      console.log('Unexpected error: ', error);
    }
  }
};
// advanced axios usage
// https://geshan.com.np/blog/2023/11/axios-typescript/
