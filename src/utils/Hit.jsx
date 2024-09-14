import React from 'react';
import Link from 'next/link';

const Hit = ({ hit }) => {
  return (
    <div className="hit-item">
      <Link
        href={`/posts/${hit.objectID}`}
        className="hit-link block py-0 hover:bg-gray-300"
      >
        <h2 className="text-md font-bold mb-0 font-medium hover:text-yellow-600">{hit.title}</h2>
        <p className="text-sm text-gray-600">
          {hit.category} || {hit.neighborhood}
        </p>
      </Link>
    </div>
  );
};

export default Hit;
