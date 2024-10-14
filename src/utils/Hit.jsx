import React from 'react';
import Link from 'next/link';

const Hit = ({ hit }) => {
  return (
    <div className="hit-item">
      <Link
        href={`/posts/${hit.objectID}`}
        className="hit-link block py-0 hover:bg-gray-300"
      >
        <h3 className="text-md font-bold font-serif hover:text-yellow-600">{hit.title}</h3>
        <span className="text-sm text-indent-0 text-gray-600">
          {hit.category} || {hit.neighborhood}
        </span>
      </Link>
    </div>
  );
};

export default Hit;
