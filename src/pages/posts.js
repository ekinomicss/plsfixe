import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Grid from '../components/Grid';
import { getSortedPostsData } from '../utils/markdownToHtml';
import fetch from 'node-fetch';

const CATEGORIES = {
  ALL: 'Posts',
  REVIEWS: 'Review',
  LISTS: 'List',
  BLOG_POSTS: 'Blog Post',
};

const NEIGHBORHOODS = {
  ALL: 'Neighborhoods',
  LES: 'Lower East Side',
  EAST_VILLAGE: 'East Village',
  MIDTOWN_EAST: 'Midtown East',
  HELLS_KITCHEM: "Hell's Kitchen",
  NOHO: 'Noho',
};

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      postData,
    },
  };
}

const Posts = ({ allPostsData = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES.ALL);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(NEIGHBORHOODS.ALL);
  const [filteredPosts, setFilteredPosts] = useState(allPostsData);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true); 
    setTimeout(() => {
      let newFilteredPosts = allPostsData;

      // Filter by category if not 'All'
      if (selectedCategory !== CATEGORIES.ALL) {
        newFilteredPosts = newFilteredPosts.filter(
          (post) => post.category === selectedCategory
        );
      }

      // Filter by neighborhood if not 'All'
      if (selectedNeighborhood !== NEIGHBORHOODS.ALL) {
        newFilteredPosts = newFilteredPosts.filter(
          (post) => post.neighborhood === selectedNeighborhood
        );
      }

      setFilteredPosts(newFilteredPosts);
      setIsTransitioning(false);
    }, 300); 
  }, [selectedCategory, selectedNeighborhood, allPostsData]);

  return (
    <Layout>
      <div className="container mx-auto py-12 font-sans px-6">
        <h1 className="text-4xl font-bold font-serif mb-6">Posts</h1>
        
        {/* Category Filter Buttons */}
        <div className="flex space-x-4 mb-2">
          {Object.values(CATEGORIES).map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg font-bold font-serif ${
                selectedCategory === category
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-black hover:bg-yellow-200'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category === CATEGORIES.ALL
                ? 'Posts'
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Neighborhood Filter Buttons */}
        <div className="flex space-x-4 mb-4">
          {Object.values(NEIGHBORHOODS)
           .sort((a, b) => {
            // Special handling: keep "Neighborhoods" at the top
            if (a === 'Neighborhoods') return -1;
            if (b === 'Neighborhoods') return 1;
            return a.localeCompare(b); // Sort other items alphabetically
          })
            .map((neighborhood) => (
            <button
              key={neighborhood}
              className={`px-4 py-2 text-sm rounded-lg font-bold font-serif ${
                selectedNeighborhood === neighborhood
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-black hover:bg-yellow-200'
              }`}
              onClick={() => setSelectedNeighborhood(neighborhood)}
            >
              {neighborhood.charAt(0).toUpperCase() + neighborhood.slice(1)}
            </button>
          ))}
        </div>

        {/* Fade-in/out animation for the posts */}
        <div
          className={`transition-opacity duration-300 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {filteredPosts.length > 0 ? (
            <Grid posts={filteredPosts} />
          ) : (
            <p>No articles found matching the filters.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Posts;
