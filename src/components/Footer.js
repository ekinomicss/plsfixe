// src/components/Footer.js

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-4">© 2024 Pls Fixe Nyc. All Rights Reserved.</p>
        <ul className="flex justify-center space-x-4">
          <li>
            <a href="/" className="hover:underline">
              Main Menu
            </a>
          </li>
          <li>
            <a href="/about" className="hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="/posts" className="hover:underline">
              Reviews
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
