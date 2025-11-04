import React from 'react';
import hero from './hero.png';
import './Hero.css';
import { Link } from 'react-router-dom';

interface Props {}

const Hero = (props: Props) => {
  return (
    <section id="hero">
      <div className="container mx-auto flex flex-col-reverse p-8 lg:flex-row">
        <div className="lg:mt:16 m-10 mb-44 flex flex-col space-y-10 lg:m-10 lg:w-1/2 xl:m-20 xl:mb-52">
          <h1 className="text-center text-5xl font-bold lg:max-w-md lg:text-left lg:text-6xl">
            Financial data with no news.
          </h1>

          <p className="text-center text-2xl text-gray-400 lg:max-w-md lg:text-left">
            Search relevant financial documents without fear mongering and fake
            news.
          </p>

          <div className="mx-auto lg:mx-0">
            <Link
              to="/search"
              className="bg-lightGreen rounded px-10 py-5 text-2xl font-bold text-white hover:opacity-70 lg:py-4"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="mx-auto mb-24 md:w-180 md:px-10 lg:mb-0 lg:w-1/2">
          <img src={hero} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
