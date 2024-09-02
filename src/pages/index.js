import React from 'react';
import { getSortedPostsData } from '../utils/markdownToHtml';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

const Home = ({ allPostsData }) => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of the blog.</p>
      <ul>
        {allPostsData.map(({ id, title, date }) => (
          <li key={id}>
            <a href={`/posts/${id}`}>{title}</a>
            <br />
            <small>{date}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;