import React from 'react';
import PostCard from './PostCard';
import Link from 'next/link';

const Grid = ({ posts }) => {
  return (
    <div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 py-4 px-2 sm:px-0">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
        <Link href="/posts" className="block px-4 py-3 font-bold rounded-lg font-serif text-lg text-black text-bottom hover:text-yellow-600 hover:text-white transition-all duration-300 ease-in-out">
          Browse all posts &gt;
        </Link>
    </div>
    </div>
  );
};

export default Grid;
