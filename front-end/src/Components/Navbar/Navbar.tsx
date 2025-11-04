import React from 'react';
import logo from './logo.png';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/useAuth';

interface Props {}

const Navbar = (props: Props) => {
  const { isLoggedIn, user, logout } = useAuth();
  return (
    <nav className="relative container mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-20">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
          <div className="hidden font-bold lg:flex">
            <Link to="/search" className="hover:text-darkBlue text-black">
              Search
            </Link>
          </div>
        </div>
        {isLoggedIn() ? (
          <div className="text-back hidden items-center space-x-6 lg:flex">
            <div className="hover:text-darkBlue">Welcome, {user?.username}</div>
            <a
              onClick={logout}
              className="bg-lightGreen rounded px-8 py-3 font-bold text-white hover:opacity-70"
            >
              Logout
            </a>
          </div>
        ) : (
          <div className="text-back hidden items-center space-x-6 lg:flex">
            <Link to="/login" className="hover:text-darkBlue">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-lightGreen rounded px-8 py-3 font-bold text-white hover:opacity-70"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
