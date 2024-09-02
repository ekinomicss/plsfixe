import React from 'react';

const Post = ({ post }) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export async function getStaticPaths() {
  // Fetch or generate the list of paths
  const paths = [
    { params: { slug: 'example-post' } },
    // Add more paths here
  ];

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // Fetch or generate the post data based on the slug
  const post = {
    title: 'Example Post',
    content: 'This is an example post.',
  };

  return { props: { post } };
}

export default Post;