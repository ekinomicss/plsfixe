import { getAllPostSlugs, getPostData } from '../../utils/markdownToHtml'; 
import Layout from '../../components/Layout';
import { getGoogleMapsData } from '../../utils/googleMapsApi';  // Assuming this is where you keep your API logic

export async function getStaticPaths() {
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch the post content based on the slug
  const postData = await getPostData(params.slug);

  // Initialize Google Maps data
  let googleMapsData = { rating: null, user_ratings_total: null };

  if (postData.gmaps) {
    googleMapsData = await getGoogleMapsData(postData.gmaps); // Fetch the Google Maps data
  }

  return {
    props: {
      postData,
      googleMapsData, // Pass the googleMapsData to the component
    },
  };
}

const Post = ({ postData, googleMapsData }) => {
  return (
    <Layout>
      <article className="container mx-auto py-12 font-sans px-6">
        <h1 className="text-4xl font-bold font-serif mb-6">{postData.title}</h1>
        <img
          src={postData.thumbnail}
          className="w-full h-96 object-cover mb-3 rounded-lg border-4 border-double border-black"
        />
        <p className="text-md mb-- font-serif">
          {postData.category && ` ${postData.category}`}
          {postData.neighborhood && ` | ${postData.neighborhood}`}
          <br />
          <i>Last updated: {postData.date} </i>
        </p>
        <div className="flex flex-col mb-2">
          <img src="/images/divider1.png" className="w-80 mx-auto" />
        </div>

        {/* Google Maps Rating Box */}
        {googleMapsData?.rating && (
          <div className="border-4 border-double border-black rounded-lg p-4 flex items-center justify-between bg-gray-100 mb-4 w-56">
            <div className="flex items-center">
              <img src="/images/google_maps_logo.png" alt="Google Maps" width={30} height={30} />
              <div className="ml-3">
                <span className="font-bold text-lg">{googleMapsData.rating}</span>
                <span className="text-gray-500"> ({googleMapsData.user_ratings_total} reviews)</span>
              </div>
            </div>
          </div>
        )}

        <div
          className="border-4 border-double border-black rounded-lg p-6"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
        <div className="flex flex-col mt-2">
          <img src="/images/divider1_bottom.png" className="w-80 mx-auto" />
        </div>
        <a href="/posts">
          <h4 className="text-lg font-bold underline font-serif mt-5 hover:text-yellow-600 duration-300 ease-in-out">
            &lt; All Posts
          </h4>
        </a>
      </article>
    </Layout>
  );
};

export default Post;
