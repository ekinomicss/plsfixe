// src/components/Header.js

import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-[#ede6d8] shadow-md py-4">
      <div className="container mx-auto justify-between items-center px-4">
        {/* Logo and Title on the Left */}
        <div className="flex items-center space-x-4">
          <Link href="/">
            <img src="/images/utensils_nobg.png" alt="Logo" className="h-14 w-14" /> 
          </Link>
          <h1 className="text-5xl text-gray-700 font-serif font-bold italic small-caps">
            Pls Fixe NYC
          </h1>
        </div>
        </div>
      
        <div className="container mx-auto items-right px-4">
        {/* Navigation Links on the Right */}
        <nav className="flex items-center space-x-6 py-3">
          <Link href="/" className="text-gray-700 hover:text-gray-900 text-base font-roboto">
            Home
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-gray-900 text-base font-roboto">
            About
          </Link>
          <Link href="/posts" className="text-gray-700 hover:text-gray-900 text-base font-roboto">
            Blog
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-gray-900 text-base font-roboto">
            Contact
          </Link>
        </nav>
        </div>
    </header>
  );
}
