// src/components/Footer.js

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-gray py-6 border-b-8 border-t-8 border-double border-white">
      <div className="container mx-auto text-center">
        <p className="mb-4 indent-0 ">© 2024 Pls Fixe Nyc.</p>
        <ul className="flex text-white justify-center space-x-4 color-beige list-none m-0">
          <li>
            <Link href="/" className=" text-gray-300 hover:text-yellow-600">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className=" text-gray-300 hover:text-yellow-600">
              About
            </Link>
          </li>
          <li>
            <Link href="/posts" className="text-gray-300 hover:text-yellow-600">
              Posts
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-gray-300 hover:text-yellow-600">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
