import React from 'react';
import Link from 'next/link';

const Hit = ({ hit }) => {
  return (
    <div className="hit-item">
      <Link
        href={`/posts/${hit.objectID}`}
        className="hit-link block px-2 py-0 hover:bg-gray-100"
      >
        <h2 className="text-sm font-large">{hit.title}</h2>
        {/* <p className="text-sm text-gray-600">
          {hit.content.substring(0, 100)}...
        </p> */}
      </Link>
    </div>
  );
};

export default Hit;
