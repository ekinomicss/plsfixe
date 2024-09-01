import Head from 'next/head';
import Layout from '../components/Layout';
import Grid from '../components/Grid';
import PostCard from '../components/PostCard';

export default function Home() {
  const posts = [
    {
      title: 'First Post',
      description: 'This is the first post on my food blog.',
      imageUrl: '/images/first-post.jpg',
      slug: 'first-post'
    },
    {
      title: 'Second Post',
      description: 'Another delicious recipe to try out.',
      imageUrl: '/images/second-post.jpg',
      slug: 'second-post'
    }
    // Add more posts as needed
  ];

  return (
    <Layout>
      <Head>
        <title>My Food Blog</title>
        <meta name="description" content="A blog about delicious food and recipes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Welcome to My Food Blog</h1>
        <Grid>
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </Grid>
      </main>
    </Layout>
  );
}
