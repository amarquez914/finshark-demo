import React from 'react';
import { Outlet } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
  ticker: string;
}

// nested routes explainer
// https://www.youtube.com/watch?v=nXLTocqLy-Q&list=PL82C6-O4XrHcNJd4ejg8pX5fZaIDZmXyn&index=18
const CompanyDashboard = ({ children, ticker }: Props) => {
  return (
    <div className="bg-blueGray-100 relative w-full md:ml-64">
      <div className="bg-lightBlue-500 relative pt-20 pb-32">
        <div className="mx-auto w-full px-4 md:px-6">
          <div>
            <div className="flex flex-wrap">{children}</div>
            <div className="flex flex-wrap">{<Outlet context={ticker} />}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
