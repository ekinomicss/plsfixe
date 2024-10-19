import React, { useState } from 'react';
import Link from 'next/link';
import { Search } from "../utils/Search";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [neighborhoodOpen, setNeighborhoodOpen] = useState(false);
  const [guidesOpen, setGuidesOpen] = useState(false);

  const neighborhoods = [
    'Alphabet City', 'Chelsea', 'Chinatown', 'Columbus Circle', 'East Harlem', 'East Village',
    'Financial District', 'Flatiron', 'Fort Greene', 'Gramercy', 'Greenpoint', 'Greenwich Village',
    'Harlem', "Hell's Kitchen", 'Hudson Yards', 'Kips Bay', 'Koreatown', 'Lower East Side',
    'Meatpacking District', 'Midtown', 'Midtown East', 'Morningside Heights', 'Murray Hill',
    'Noho', 'Nolita', 'Nomad', 'Park Slope', 'Soho', 'Tribeca', 'Union Square', 'Upper East Side',
    'Upper West Side', 'West Harlem', 'West Village', 'Williamsburg'
  ].sort();

  // Mock data for recently updated guides
  const recentGuides = [
    { title: "Best Brunch Spots in NYC", slug: "best-brunch-spots" },
    { title: "Hidden Gems in Brooklyn", slug: "hidden-gems-brooklyn" },
    { title: "Top 10 Rooftop Bars", slug: "top-rooftop-bars" },
    { title: "Vegan-Friendly Restaurants", slug: "vegan-friendly-restaurants" },
    { title: "NYC's Best Pizza Joints", slug: "best-pizza-joints" }
  ];

  return (
    <header className="fixed w-full bg-black border-b-8 border-double border-white py-4 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 flex-wrap md:flex-nowrap">
        {/* Logo and Title on the Left */}
        <div className="flex items-center space-x-4">
          <Link href="/">
            <img src="/images/utensils_nobg.png" alt="Logo" className="h-10 w-10 sm:h-14 sm:w-14" />
          </Link>
          <a href="/" className="block">
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-white font-serif font-bold italic hover:text-yellow-600 duration-300 ease-in-out [text-decoration:underline_overline]">
              <span className="font-bold italic [font-variant:small-caps]">
                Pls Fixe Nyc
              </span>
            </h1>
          </a>
        </div>

        {/* Navigation Links on the Right */}
        <nav className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-6 mt-4 md:mt-0 w-full md:w-auto">
          <div className="relative"> <Search />
          </div>

          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              className="text-white hover:text-yellow-600 hover:underline transition-all duration-300 ease-in-out font-bold font-serif text-md  bg-transparent focus:outline-none"
              style={{ backgroundColor: 'transparent', boxShadow: 'none' }}
            >
              DINE
            </button>
            {/* Dropdown for DINE */}
            {dropdownOpen && (
              <div className="absolute mt-0 w-48 bg-white border border-black rounded-lg shadow-lg transform transition-all duration-300 ease-in-out">
                <ul className="py-2 list-none m-0">
                  <li>
                    <Link href={{ pathname: '/posts', query: { category: 'ALL', neighborhood: 'ALL' } }} className="block px-4 py-3 font-bold font-serif text-md text-black hover:bg-yellow-600 hover:text-white transition-all duration-300 ease-in-out">
                      POSTS
                    </Link>
                  </li>
                  <li
                    onMouseEnter={() => setNeighborhoodOpen(true)}
                    onMouseLeave={() => setNeighborhoodOpen(false)}
                    className="relative"
                  >
                    <button className="block w-full text-left px-4 py-3 font-bold font-serif text-md text-black hover:bg-yellow-600 hover:text-white transition-all duration-300 ease-in-out focus:outline-none">
                      NEIGHBORHOODS
                    </button>
                    {neighborhoodOpen && (
                      <div className="absolute right-full top-0 mr-2 bg-white border border-black rounded-lg shadow-lg transition-all duration-300 ease-in-out p-4" style={{ width: '300px', maxHeight: '80vh', overflowY: 'auto' }}>
                        <h3 className="text-black font-serif font-bold text-lg mb-3 border-b border-black pb-2">Explore Neighborhoods</h3>
                        <div className="grid grid-cols-1 gap-2">
                          {neighborhoods.map((neighborhood) => (
                            <Link
                              key={neighborhood}
                              href={{ pathname: '/posts', query: { neighborhood: neighborhood.replace(/ /g, '_').toUpperCase() } }}
                              className="block px-3 py-2 text-md text-black font-serif hover:bg-yellow-600 hover:text-white rounded-md transition-all duration-300 ease-in-out"
                            >
                              {neighborhood}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                  <li
                    onMouseEnter={() => setGuidesOpen(true)}
                    onMouseLeave={() => setGuidesOpen(false)}
                    className="relative"
                  >
                    <button className="block w-full text-left px-4 py-3 font-bold font-serif text-md text-black hover:bg-yellow-600 hover:text-white transition-all duration-300 ease-in-out focus:outline-none">
                      GUIDES
                    </button>
                    {guidesOpen && (
                      <div className="absolute right-full top-0 mr-2 bg-white border border-black rounded-lg shadow-lg transition-all duration-300 ease-in-out p-4" style={{ width: '300px', maxHeight: '80vh', overflowY: 'auto' }}>
                        <h3 className="text-black font-serif font-bold text-lg mb-3 border-b border-black pb-2">Recent Guides</h3>
                        <div className="grid grid-cols-1 gap-2">
                          {recentGuides.map((guide) => (
                            <Link
                              key={guide.slug}
                              href={{ pathname: '/posts', query: { category: 'GUIDES', slug: guide.slug } }}
                              className="block px-3 py-2 text-md text-black font-serif hover:bg-yellow-600 hover:text-white rounded-md transition-all duration-300 ease-in-out"
                            >
                              {guide.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                  <li>
                    <Link href="/map" className="block px-4 py-3 font-bold font-serif text-md text-black hover:bg-yellow-600 hover:text-white transition-all duration-300 ease-in-out">
                      MAP
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <Link href="/contact" className="text-white hover:text-yellow-600 hover:underline transition-all duration-300 ease-in-out font-bold font-serif">
            CONTACT
          </Link>
        </nav>
      </div>
    </header>
  );
}