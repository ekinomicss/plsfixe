import React from 'react';
import { getSortedPostsData } from '../utils/markdownToHtml';
import Layout from '../components/Layout';
import Grid from '../components/Grid';

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
    <Layout>
      <div className="py-14">
        <h1 className="text-3xl font-bold mb-3">Welcome to the Home Page</h1>
        <p className="mb-12">This is the home page of the blog.</p>
        <Grid posts={allPostsData} />
      </div>
    </Layout>
  );
};

export default Home;
