import React, { useEffect, useState } from 'react';
import type { CompanyIncomeStatement } from '../../company';
import { useOutletContext } from 'react-router-dom';
import { getIncomeStatement } from '../../api';
import RatioList from '../RatioList/RatioList';
import Table from '../Table/Table';
import Spinner from '../Spinner/Spinner';
import {
  formatLargeMonetaryNumber,
  formatRatio,
} from '../../Helpers/NumberFormatting';

interface Props {}

const tableConfig = [
  {
    label: 'Date',
    render: (company: CompanyIncomeStatement) => company.date,
  },
  {
    label: 'Revenue',
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.revenue),
  },
  {
    label: 'Cost Of Revenue',
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.costOfRevenue),
  },
  {
    label: 'Depreciation',
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.depreciationAndAmortization),
  },
  {
    label: 'Operating Income',
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.operatingIncome),
  },
  {
    label: 'Income Before Taxes',
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.incomeBeforeTax),
  },
  {
    label: 'Net Income',
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.netIncome),
  },
  {
    label: 'Net Income Ratio',
    render: (company: CompanyIncomeStatement) => {
      if (company.netIncome > 0 && company.revenue > company.netIncome) {
        const ratio = (company.netIncome / company.revenue) * 100;
        return formatRatio(ratio);
      }
      return 0;
    },
  },
  {
    label: 'Earnings Per Share',
    render: (company: CompanyIncomeStatement) => formatRatio(company.eps),
  },
  {
    label: 'Earnings Per Diluted',
    render: (company: CompanyIncomeStatement) =>
      formatRatio(company.epsDiluted),
  },
  {
    label: 'Gross Profit Ratio',
    render: (company: CompanyIncomeStatement) => {
      if (company.grossProfit > 0 && company.revenue > company.grossProfit) {
        const ratio = (company.grossProfit / company.revenue) * 100;
        return formatRatio(ratio);
      }
      return 0;
    },
  },
  {
    label: 'Operating Income Ratio',
    render: (company: CompanyIncomeStatement) => {
      if (company.operatingIncome > 0 && company.revenue > 0) {
        const ratio = (company.operatingIncome / company.revenue) * 100;
        return formatRatio(ratio);
      }
      return 0;
    },
  },
  {
    label: 'Income Before Taxes Ratio',
    render: (company: CompanyIncomeStatement) => {
      if (company.incomeBeforeTax > 0 && company.revenue > 0) {
        const ratio = (company.incomeBeforeTax / company.revenue) * 100;
        return formatRatio(ratio);
      }
      return 0;
    },
  },
];

const IncomeStatement = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [incomeStatement, setIncomeStatement] =
    useState<CompanyIncomeStatement[]>();

  useEffect(() => {
    const getCompanyIncomeStatement = async () => {
      const value = await getIncomeStatement(ticker);
      setIncomeStatement(value);
    };

    getCompanyIncomeStatement();
  }, []);

  return (
    <>
      {incomeStatement ? (
        <Table data={incomeStatement} config={tableConfig} />
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default IncomeStatement;
