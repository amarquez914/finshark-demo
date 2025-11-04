import React, { useState, useEffect } from 'react';
import type { CompanyKeyMetrics } from '../../company';
import { useOutletContext } from 'react-router-dom';
import { getKeyMetrics } from '../../api';
import RatioList from '../RatioList/RatioList';
import Spinner from '../Spinner/Spinner';
import {
  formatLargeMonetaryNumber,
  formatRatio,
} from '../../Helpers/NumberFormatting';
import StockComment from '../StockComment/StockComment';

interface Props {}

const tableConfig = [
  {
    label: 'Market Cap',
    render: (company: CompanyKeyMetrics) =>
      formatLargeMonetaryNumber(company.marketCap),
    subTitle: "Total value of all a company's shares of stock",
  },
  {
    label: 'Current Ratio',
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.currentRatioTTM),
    subTitle:
      'Measures the companies ability to pay short term debt obligations',
  },
  {
    label: 'Return On Equity',
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.returnOnEquityTTM),
    subTitle:
      "Return on equity is the measure of a company's net income divided by its shareholder's equity",
  },
  {
    label: 'Return On Assets',
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.returnOnTangibleAssetsTTM),
    subTitle:
      'Return on assets is the measure of how effective a company is using its assets',
  },
  {
    label: 'Graham Number',
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.grahamNumberTTM),
    subTitle:
      'This is the upper bound of the price range that a defensive investor should pay for a stock',
  },
];

const CompanyProfile = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [companyData, setCompanyData] = useState<CompanyKeyMetrics>();

  useEffect(() => {
    const getCompanyKeyMetrics = async () => {
      const value = await getKeyMetrics(ticker);
      setCompanyData(value);
    };

    getCompanyKeyMetrics();
  }, []);

  return (
    <>
      {companyData ? (
        <>
          <RatioList data={companyData} config={tableConfig} />
          <StockComment stockSymbol={ticker} />
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default CompanyProfile;

// all of these were moved to financial ratios API endpoint
// {
//   label: 'Free Cashflow Per Share',
//   render: (company: CompanyKeyMetrics) => company.evToFreeCashFlowTTM,
//   subTitle:
//     'Return on assets is the measure of how effective a company is using its assets',
// },
// {
//   label: "Book Value Per Share TTM",
//   render: (company: CompanyKeyMetrics) => company.bookValuePerShareTTM,
//   subTitle:
//     "Book value per share indicates a firm's net asset value (total assets - total liabilities) on per share basis",
// },
// {
//   label: "Dividend Yield TTM",
//   render: (company: CompanyKeyMetrics) => company.dividendYieldTTM,
//   subTitle: "Shows how much a company pays each year relative to stock price",
// },
// {
//   label: "Capex Per Share TTM",
//   render: (company: CompanyKeyMetrics) => company.capexPerShareTTM,
//   subTitle:
//     "Capex is used by a company to aquire, upgrade, and maintain physical assets",
// },
// {
//   label: 'PE Ratio',
//   render: (company: CompanyKeyMetrics) => company.currentRatioTTM,
//   subTitle:
//     'This is the upper bound of the price range that a defensive investor should pay for a stock',
// },
