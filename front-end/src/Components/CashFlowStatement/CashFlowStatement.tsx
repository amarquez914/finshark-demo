import React, { useEffect, useState } from 'react';
import type { CompanyCashFlow } from '../../company';
import Table from '../Table/Table';
import { useOutletContext } from 'react-router-dom';
import { getCashFlow } from '../../api';
import Spinner from '../Spinner/Spinner';
import { formatLargeMonetaryNumber } from '../../Helpers/NumberFormatting';

interface Props {}

const config = [
  {
    label: 'Date',
    render: (company: CompanyCashFlow) => company.date,
  },
  {
    label: 'Operating Cashflow',
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.operatingCashFlow),
  },
  {
    label: 'Investing Cashflow',
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.netCashProvidedByInvestingActivities),
  },
  {
    label: 'Financing Cashflow',
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.netCashProvidedByFinancingActivities),
  },
  {
    label: 'Cash At End of Period',
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.cashAtEndOfPeriod),
  },
  {
    label: 'CapEX',
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.capitalExpenditure),
  },
  {
    label: 'Issuance Of Stock',
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.commonStockIssuance),
  },
  {
    label: 'Free Cash Flow',
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.freeCashFlow),
  },
];

const CashflowStatement = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [cashflowData, setCashflow] = useState<CompanyCashFlow[]>();

  useEffect(() => {
    const getCompanyCashFlow = async () => {
      const result = await getCashFlow(ticker);
      setCashflow(result);
    };

    getCompanyCashFlow();
  }, []);

  return (
    <>
      {cashflowData ? (
        <Table config={config} data={cashflowData} />
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default CashflowStatement;
