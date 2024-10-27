import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import Map from '../components/Map';
import Grid from '../components/Grid';
import { getSortedPostsData } from '../utils/markdownToHtml';
import { useRouter } from 'next/router';

const CATEGORIES = {
  ALL: 'Posts',
  REVIEWS: 'Review',
  GUIDES: 'Guide',
  BLOG_POSTS: 'Blog Post',
};

const NEIGHBORHOODS = {
  ALL: 'Neighborhoods',
  LOWER_EAST_SIDE: 'Lower East Side',
  EAST_VILLAGE: 'East Village',
  MIDTOWN_EAST: 'Midtown East',
  HELLS_KITCHEN: "Hell's Kitchen",
  NOHO: 'Noho',
};

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Posts({ allPostsData = [] }) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES.ALL);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(NEIGHBORHOODS.ALL);
  const [mapSelected, setMapSelected] = useState(false)
  const [filteredPosts, setFilteredPosts] = useState(allPostsData);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isNeighborhoodMenuOpen, setIsNeighborhoodMenuOpen] = useState(false);
  const [isMapTransitioning, setIsMapTransitioning] = useState(false);

  useEffect(() => {
    if (router.query.category && CATEGORIES[router.query.category.toUpperCase()]) {
      setSelectedCategory(CATEGORIES[router.query.category.toUpperCase()]);
    }
    if (router.query.neighborhood && NEIGHBORHOODS[router.query.neighborhood.replace(/\+/g, '_').replace(/ /g, '_').toUpperCase()]) {
      setSelectedNeighborhood(NEIGHBORHOODS[router.query.neighborhood.replace(/\+/g, '_').replace(/ /g, '_').toUpperCase()]);
    }
  }, [router.query]);

  useEffect(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      let newFilteredPosts = allPostsData;

      if (selectedCategory !== CATEGORIES.ALL) {
        newFilteredPosts = newFilteredPosts.filter(
          (post) => post.category === selectedCategory
        );
      }

      if (selectedNeighborhood !== NEIGHBORHOODS.ALL) {
        newFilteredPosts = newFilteredPosts.filter(
          (post) => post.neighborhood === selectedNeighborhood
        );
      }

      setFilteredPosts(newFilteredPosts);
      setIsTransitioning(false);
    }, 300);
  }, [selectedCategory, selectedNeighborhood, allPostsData]);

  const handleMapClick = () => {
    setIsMapTransitioning(true);
    setMapSelected(true);
    setTimeout(() => {
      setIsMapTransitioning(false);
    }, 300);
  };
  const handleNeighborhoodSelect = (neighborhood) => {
    setSelectedNeighborhood(neighborhood);
    setIsNeighborhoodMenuOpen(false);
  };

  const resetNeighborhood = (e) => {
    e.stopPropagation();
    setSelectedNeighborhood(NEIGHBORHOODS.ALL);
    setIsNeighborhoodMenuOpen(false);
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 font-sans px-6">
        <div className="flex space-x-4 mb-2">
          {Object.values(CATEGORIES).map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg font-bold font-serif 
                ${selectedCategory === category && !mapSelected
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-black hover:bg-yellow-200'
                }`}
              onClick={() => {setSelectedCategory(category);
                             setMapSelected(false);
                          }}
            >
              {category === CATEGORIES.ALL
                ? 'Posts'
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>))}
          <button className={`px-4 py-2 rounded-lg font-bold font-serif bg-gray-100 text-black hover:bg-yellow-200
                  hover:'bg-yellow-600 text-white' ${mapSelected
              ? 'bg-yellow-600 text-white'
              : 'bg-gray-100 text-black hover:bg-yellow-200'
                }`}
            onClick={handleMapClick}
                  >
              Map
            </button>
        </div>

        <div className="relative mb-4">
          <button
            className={`px-4 py-2 text-md rounded-lg font-bold font-serif flex items-center justify-between w-48 ${selectedNeighborhood !== NEIGHBORHOODS.ALL
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-100 text-black hover:bg-yellow-200'
              }`}
            onClick={() => setIsNeighborhoodMenuOpen(!isNeighborhoodMenuOpen)}
          >
            <span className="truncate">
              {selectedNeighborhood.charAt(0).toUpperCase() + selectedNeighborhood.slice(1)}
            </span>
            <div className="flex items-center">
              {selectedNeighborhood !== NEIGHBORHOODS.ALL && (
                <button
                  className="mr-2 text-sm font-bold hover:text-yellow-600"
                  onClick={resetNeighborhood}
                >
                  ✕
                </button>
              )}
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </button>
          {isNeighborhoodMenuOpen && (
            <div className="absolute z-10 mt-1 w-48 rounded-md bg-white shadow-lg">
              {Object.values(NEIGHBORHOODS)
                .sort((a, b) => {
                  if (a === 'Neighborhoods') return -1;
                  if (b === 'Neighborhoods') return 1;
                  return a.localeCompare(b);
                })
                .map((neighborhood) => (
                  <button
                    key={neighborhood}
                    className={`block w-full text-left px-4 py-2 text-sm font-bold font-serif ${selectedNeighborhood === neighborhood
                        ? 'bg-yellow-600 text-white'
                        : 'text-black hover:bg-yellow-200'
                      }`}
                    onClick={() => handleNeighborhoodSelect(neighborhood)}
                  >
                    {neighborhood.charAt(0).toUpperCase() + neighborhood.slice(1)}
                  </button>
                ))}
            </div>
          )}
        </div>

        <div className="relative">
          <div
            className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'
              } ${!mapSelected ? 'block' : 'hidden'}`}
          >
            {filteredPosts.length > 0 ? (
              <Grid posts={filteredPosts} />
            ) : (
              <p>No posts found matching the filters.</p>
            )}
          </div>

          <div
            className={`transition-opacity duration-300 ${isMapTransitioning ? 'opacity-0' : 'opacity-100'
              } ${mapSelected ? 'block' : 'hidden'}`}
          >
            <Map />
          </div>
        </div>
      </div>
    </Layout>
  );
}
