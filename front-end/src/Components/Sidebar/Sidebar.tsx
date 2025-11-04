import React from 'react';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <nav className="absolute top-0 bottom-0 left-0 z-9999 block w-64 -translate-x-full transform flex-row flex-nowrap bg-white px-6 py-4 shadow-xl transition-all duration-300 ease-in-out md:z-10 md:translate-x-0">
      <button className="text-blueGray-700 border-blueGray-100 -right-24-px absolute top-1/2 z-9998 flex h-10 w-6 cursor-pointer items-center justify-center rounded-r border border-t border-r border-b border-l-0 border-solid border-transparent bg-white text-xl leading-none focus:outline-none md:hidden">
        <i className="fas fa-ellipsis-v"></i>
      </button>

      <div className="mx-auto flex min-h-full w-full flex-col flex-wrap items-center justify-between overflow-x-hidden overflow-y-auto px-0">
        <div className="relative z-40 mt-4 flex h-auto w-full flex-1 flex-col items-center items-stretch overflow-x-hidden overflow-y-auto rounded bg-white opacity-100">
          <div className="flex list-none flex-col md:min-w-full md:flex-col">
            <Link
              to="company-profile"
              className="text-bluegray-500 text-medium pt--1 block flex pb-4 font-bold uppercase no-underline md:min-w-full"
            >
              <FaHome />
              <h6 className="ml-3">Company Profile</h6>
            </Link>
            <Link
              to="income-statement"
              className="text-bluegray-500 text-medium pt--1 block flex pb-4 font-bold uppercase no-underline md:min-w-full"
            >
              <FaHome />
              <h6 className="ml-3">Income Statement</h6>
            </Link>
            <Link
              to="balance-sheet"
              className="text-bluegray-500 text-medium pt--1 block flex pb-4 font-bold uppercase no-underline md:min-w-full"
            >
              <FaHome />
              <h6 className="ml-3">Balance Sheet</h6>
            </Link>
            <Link
              to="cashflow-statement"
              className="text-bluegray-500 text-medium pt--1 block flex pb-4 font-bold uppercase no-underline md:min-w-full"
            >
              <FaHome />
              <h6 className="ml-3">Cashflow Statement</h6>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
