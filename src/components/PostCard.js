import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const PostCard = ({ post }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setHoverPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered]);

  return (
    <div
      ref={cardRef}
      className="relative border-4 border-double border-black rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
      
    >
      <Link href={`/posts/${post.slug}`}>
        {post.thumbnail && (
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}
      </Link>
      <h2 className="text-xl font-semibold font-sans mb-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <Link href={`/posts/${post.slug}`} className="text-yellow-600">
          {post.title}
        </Link>
      </h2>
      <span className="text-gray-600">
        {post.category}
        {post.neighborhood ? ` | ${post.neighborhood}` : ''}
      </span>
      <span className="text-gray-600 flex text-xs">
        {post.date}
      </span>

      {isHovered && (
        <div
          className="absolute z-10 w-full p-4 bg-white border border-gray-200 rounded-lg shadow-lg"
          style={{
            left: `${hoverPosition.x}px`,
            top: `${hoverPosition.y}px`,
            transform: 'translate(10px, 10px)',
          }}
        >
          <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
          <div className="flex justify-between mb-2">
            {[post.menu1, post.menu2, post.menu3].filter(Boolean).map((menu, index) => (
              <img
                key={index}
                src={menu}
                alt={`Menu ${index + 1}`}
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {post.description || (post.body && post.body.substring(0, 100) + '...')}
          </span>
        </div>
      )}
    </div>
  );
};

export default PostCard;