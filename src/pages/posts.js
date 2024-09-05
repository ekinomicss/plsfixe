import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Grid from '../components/Grid';
import { getSortedPostsData } from '../utils/markdownToHtml';

const CATEGORIES = {
  ALL: 'All',
  REVIEWS: 'Review',
  LISTS: 'List',
  BLOG_POSTS: 'Blog Post',
};

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

const Posts = ({ allPostsData = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES.ALL);
  const [filteredPosts, setFilteredPosts] = useState(allPostsData);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true); // Start the transition
    setTimeout(() => {
      const newFilteredPosts =
        selectedCategory === CATEGORIES.ALL
          ? allPostsData
          : allPostsData.filter((post) => post.category === selectedCategory);
      setFilteredPosts(newFilteredPosts);
      setIsTransitioning(false); // End the transition after filtering
    }, 300); // Match this time with your CSS transition duration
  }, [selectedCategory, allPostsData]);

  return (
    <Layout>
      <div className="container mx-auto py-12 font-sans px-6">
        <h1 className="text-4xl font-bold font-serif mb-6">Posts</h1>

        {/* Category Filter Buttons */}
        <div className="flex space-x-4 mb-6">
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
                ? 'All'
                : category.charAt(0).toUpperCase() + category.slice(1)}
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
            <p>No articles found in this category.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Posts;
