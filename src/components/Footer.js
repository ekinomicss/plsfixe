// src/components/Footer.js

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#ede6d8] text-gray py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-4 ">© 2024 Pls Fixe Nyc.</p>
        <ul className="flex justify-center space-x-4 color-beige">
          <li>
            <Link href="/" className="hover:underline text-yellow-800">
              Main Menu
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:underline text-yellow-800">
              About
            </Link>
          </li>
          <li>
            <Link href="/posts" className="hover:underlin text-yellow-800">
              Reviews
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:underline text-yellow-800">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
