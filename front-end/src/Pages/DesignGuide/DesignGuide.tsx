import React from 'react';
import Table from '../../Components/Table/Table';
import RatioList from '../../Components/RatioList/RatioList';
import type { CompanyKeyMetrics } from '../../company';
import { testIncomeStatementData } from '../../Components/Table/testData';

interface Props {}
const tableConfig = [
  {
    label: 'Market Cap',
    render: (company: CompanyKeyMetrics) => company.marketCap,
    subTitle: "Total value of all a company's shares of stock",
  },
];

const DesignGuide = (props: Props) => {
  return (
    <>
      <h1>FinShark Design Page</h1>
      <h2>
        This is FinSharks design page. This is where we will house variase
        design aspects of the app.
      </h2>
      <RatioList data={testIncomeStatementData} config={tableConfig} />
      <Table data={testIncomeStatementData} config={tableConfig} />
    </>
  );
};

export default DesignGuide;
