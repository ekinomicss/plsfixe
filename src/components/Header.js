// src/components/Header.js

import React from 'react';
import Link from 'next/link';

export default function Header() {
    return (
        <header className="bg-gray-800 text-white py-6">
          <div className="container mx-auto px-4 text-center">
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
        </header>
      );
    }
    