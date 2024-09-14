import React, { useState } from 'react';
import Link from 'next/link';
import { Search } from "../utils/Search";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="fixed w-full bg-[#f5d27d] border-b-8 border-double border-black py-4 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 flex-wrap md:flex-nowrap">
        {/* Logo and Title on the Left */}
        <div className="flex items-center space-x-4">
          <Link href="/">
            <img src="/images/utensils_nobg.png" alt="Logo" className="h-10 w-10 sm:h-14 sm:w-14" /> {/* Adjust image size for smaller screens */}
          </Link>
          <a href="/" className="block">
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-black font-serif font-bold italic hover:text-yellow-600 duration-300 ease-in-out [text-decoration:underline_overline]">
              <span className="font-bold italic [font-variant:small-caps]">
                Pls Fixe Nyc
              </span>
            </h1>
          </a>
        </div>

        {/* Navigation Links on the Right */}
        <nav className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-6 mt-4 md:mt-0 w-full md:w-auto">
          <Search />

          {/* Dropdown for DINE */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              className="text-black hover:text-yellow-600 hover:underline duration-300 ease-in-out font-bold font-serif bg-transparent focus:outline-none"
              style={{ backgroundColor: 'transparent', boxShadow: 'none' }}
            >
              DINE
            </button>
            {dropdownOpen && (
              <div className="absolute mt-0 bg-[#ede6d8] border border-black rounded-lg shadow-lg transform transition-all duration-300 ease-in-out">
                <ul className="py-2">
                  <li>
                    <Link href="/posts" className="block px-4 py-2 font-bold font-serif text-black hover:bg-yellow-600 hover:text-white">
                      POSTS
                    </Link>
                  </li>
                  <li>
                    <Link href="/map" className="block px-4 py-2 font-bold font-serif text-black hover:bg-yellow-600 hover:text-white">
                      MAP
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <Link href="/contact" className="text-black hover:text-yellow-600 hover:underline duration-300 ease-in-out font-bold font-serif">
            CONTACT
          </Link>
        </nav>
      </div>
    </header>
  );
}
