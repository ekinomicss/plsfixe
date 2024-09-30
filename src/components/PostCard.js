import React from 'react';
import Link from 'next/link';

const PostCard = ({ post }) => {
  return (
    <div className="border-4 border-double border-black rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
      <Link href={`/posts/${post.slug}`}>
      {post.thumbnail && (
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      </Link>
      <h2 className="text-xl font-semibold font-sans mb-2">
        <Link href={`/posts/${post.slug}`} className="text-yellow-600">
          {post.title}
        </Link>
      </h2>
      <span className="text-gray-600">
        {post.category} 
        {post.neighborhood ? ` | ${post.neighborhood}` : ''}
        </span>
    </div>
  );
};

export default PostCard;
