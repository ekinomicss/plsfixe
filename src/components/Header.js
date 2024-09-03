// src/components/Header.js

import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-300 shadow-md py-4">
      <div className="container mx-auto justify-between items-center px-4">
        {/* Logo and Title on the Left */}
        <div className="flex items-center space-x-4">
          <Link href="/">
            <img src="/images/plsfixe_logo_no_bg.png" alt="Logo" className="h-10 w-10" /> 
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Pls Fixe NYC</h1>
        </div>

        {/* Navigation Links on the Right */}
        <nav className="flex items-center space-x-6">
          <Link href="/" className="text-gray-700 hover:text-gray-900">
            Home
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-gray-900">
            About
          </Link>
          <Link href="/posts" className="text-gray-700 hover:text-gray-900">
            Blog
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-gray-900">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
