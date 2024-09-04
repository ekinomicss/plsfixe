// src/components/Header.js

import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-[#ede6d8] border-b-8 border-double border-black py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
      {/* Logo and Title on the Left */}
      <div className="flex items-center space-x-4">
      <Link href="/">
            <img src="/images/utensils_nobg.png" alt="Logo" className="h-14 w-14" /> 
          </Link>
          <a href="/" className="block">
            <h1 className="text-5xl text-black font-serif font-bold italic hover:text-yellow-600 duration-300 ease-in-out [text-decoration:underline_overline]">
              <span className="font-bold italic [font-variant:small-caps]">
                Pls Fixe Nyc
              </span>
            </h1>
          </a>
        </div>
      
        {/* Navigation Links on the Right */}
        <nav className="flex items-center space-x-6">
          <Link href="/about" className="text-black hover:text-yellow-600 hover:underline duration-300 ease-in-out font-bold font-serif">
            ABOUT
          </Link>
          <Link href="/posts" className="text-black hover:text-yellow-600 hover:underline duration-300 ease-in-out font-bold font-serif">
            REVIEWS
          </Link>
          <Link href="/contact" className="text-black hover:text-yellow-600 hover:underline duration-300 ease-in-out font-bold font-serif">
            CONTACT
          </Link>
        </nav>
        </div>
    </header>
  );
}
