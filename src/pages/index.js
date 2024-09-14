
import Link from 'next/link';
import { getSortedPostsData } from '../utils/markdownToHtml';
import { useEffect } from 'react';
import Layout from '../components/Layout';
import Grid from '../components/Grid';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  // Automatically choose the latest post as the highlighted post (first post after sorting)
  const highlightPost = allPostsData[0];

  // Rank and select the top 5 trending posts
  const trendingPosts = allPostsData
    .filter(post => post.trendingRank !== undefined)  // Only include posts with a trending rank
    .sort((a, b) => a.trendingRank - b.trendingRank)  // Sort by rank (ascending)
    .slice(0, 5);  // Take the top 5

  // Filter out the highlighted and trending posts from the rest
  const otherPosts = allPostsData.filter(
    post => post !== highlightPost
  );
  
  return {
    props: {
      highlightPost,
      trendingPosts,
      otherPosts,
    },
  };
}

const Home = ({ highlightPost, trendingPosts, otherPosts }) => {
  return (
    <Layout>
      <div className="container mx-auto py-12">
        {/* Unified grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Highlighted Post (spanning two columns) */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-2 font-serif">Latest Review</h2>
            <div className="border-4 border-double border-black rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
            <Link href={`/posts/${highlightPost.id}`}>
            {highlightPost.thumbnail && (
                <img
                  src={highlightPost.thumbnail}
                  alt={highlightPost.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              )}
              </Link>
              <h3 className="text-2xl font-semibold font-sans mb-2">
                <Link href={`/posts/${highlightPost.id}`} className="text-yellow-600">
                  {highlightPost.title}
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">
                {highlightPost.category} 
                {highlightPost.neighborhood ? ` | ${highlightPost.neighborhood}` : ''}
              </p>
              <p>{highlightPost.excerpt}</p>
            </div>
          </div>

          {/* Trending Reviews (one column) */}
          <div className="lg:col-span-1 flex flex-col gap-0">
            <h2 className="text-2xl font-bold mb-2 font-serif">Trending</h2>
            <ul className="space-y-4 border-4 border-double border-black rounded-lg hover:shadow-lg transition-shadow duration-300">
              {trendingPosts.map((post, index) => (
                <li key={post.id} className="border-b border-gray-300 pb-4 m-4 ">
                  <div className="flex items-center">
                    <span className="text-lg font-bold mr-2">{index + 1}.</span> 
                    <Link href={`/posts/${post.id}`} className="text-lg font-semibold font-sans text-yellow-600">
                      {post.title}
                    </Link>
                  </div>
                  <p className="text-gray-500 text-sm">{post.category} {post.neighborhood ? `| ${post.neighborhood}` : ""}</p>
                </li>
              ))}
            </ul>

          {/* Instagram */}
          <div>
            {/* <h2 className="text-3xl font-bold mb-1 mt-4 font-serif">Instagram</h2> */}
            <div className="border-4 border-double border-black rounded-lg p-4 mt-1 hover:shadow-lg transition-shadow duration-300">
              <a href="https://www.instagram.com/plsfixenyc/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <img src="images/plsfixeig.png" className="h-24 w-24 mr-4" alt="PLS FIXE NYC Logo" />
                <h2 className="text-md mt-3 font-sans">Follow us on instagram! <b>@plsfixenyc</b></h2>
              </a>
            </div>
          </div>
          </div>

        </div>

  <div className="flex justify-between items-center gap-0 mt-4 mb-2">
    <img src="/images/divider1_left.png" className="w-40" />

  {/* Newsletter Subscription Form */}
  <form className="w-full mb-4 mt-4">
    {/* <label className="text-sm font-serif font-bold">Subscribe to our newsletter to be notified of new posts & exclusive opportunities.</label> */}
    <div className="flex w-full">
      <input 
        type="email" 
        placeholder="Subscribe to our newsletter to be notified of new posts & exclusive opportunities." 
        className="w-full border-2 placeholder:italic border-yellow-600 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600" 
        required
      />
      <button 
        type="submit" 
        className="w-30 bg-black text-white ml-2 px-3 rounded-lg text-sm hover:bg-yellow-500 transition duration-300">
        Submit
      </button>
    </div>
  </form>

  <img src="/images/divider1_left.png" className="w-40 transform scale-x-[-1]" />
</div>

        {/* Grid of Other Posts (below the highlight and trending section) */}
        <div className="mt-1">
        <h2 className="text-2xl font-bold mb-0 font-serif">À La Carte</h2>
          <Grid posts={otherPosts} />
        </div>
      </div>
      <div className="flex flex-col space-y-0">
        <img src = "/images/divider1_bottom.png" className="w-80 mx-auto"></img>
      </div>
    </Layout>
  );
};

export default Home;
