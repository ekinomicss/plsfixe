import React from 'react';
import Link from 'next/link';

const PostCard = ({ post }) => {
  return (
    <div className="border border-black rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-xl font-semibold mb-2">
        <Link href={`/posts/${post.id}`} className="text-yellow-600">
          {post.title}
        </Link>
      </h2>
      <p className="text-gray-600">{post.date}</p>
    </div>
  );
};

export default PostCard;
