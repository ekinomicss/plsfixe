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
    </div>
    </div>
  );
};

export default Grid;
