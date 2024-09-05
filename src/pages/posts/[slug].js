import { getAllPostSlugs, getPostData } from '../../utils/markdownToHtml'; // Fetch post data
import Layout from '../../components/Layout';

export async function getStaticPaths() {
  // Fetch the list of slugs from your posts
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch the post content based on the slug
  const postData = await getPostData(params.slug);
  return {
    props: {
      postData,
    },
  };
}

const Post = ({ postData }) => {
  return (
    <Layout>
      <article className="container mx-auto py-12 font-sans px-6">
        <h1 className="text-4xl font-bold font-serif mb-6">{postData.title}</h1>
        <p className="text-md mb-4">
          {postData.date} <br></br>
          {postData.category && ` ${postData.category}`}
          {postData.neighborhood && ` | ${postData.neighborhood}`}
          </p>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        <a href="/posts"><h4 className="text-lg font-bold underline font-serif mt-5 hover:text-yellow-600 duration-300 ease-in-out">All Posts</h4></a>
      </article>
    </Layout>
  );
};

export default Post;
