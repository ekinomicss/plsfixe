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
        
          <img src = {postData.thumbnail} className = " w-full h-96 object-cover mb-3 rounded-lg"></img>
          <p className="text-md mb-8 font-serif">
          {postData.category && ` ${postData.category}`}
          {postData.neighborhood && ` | ${postData.neighborhood}`}
          <br></br>
          <i>Last updated: {postData.date} </i>
          </p>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        {/* Go to all posts page */}
        <a href="/posts"><h4 className="text-lg font-bold underline font-serif mt-5 hover:text-yellow-600 duration-300 ease-in-out">&lt; All Posts</h4></a>
      </article>
    </Layout>
  );
};

export default Post;
