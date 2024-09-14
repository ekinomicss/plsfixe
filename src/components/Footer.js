// src/components/Footer.js

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#f5d27d] text-gray py-6 border-b-8 border-t-8 border-double border-black">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-4 ">© 2024 Pls Fixe Nyc.</p>
        <ul className="flex justify-center space-x-4 color-beige">
          <li>
            <Link href="/" className="text-yellow-800 hover:text-yellow-600">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className=" text-yellow-800 hover:text-yellow-600">
              About
            </Link>
          </li>
          <li>
            <Link href="/posts" className="text-yellow-800 hover:text-yellow-600">
              Reviews
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-yellow-800 hover:text-yellow-600">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
