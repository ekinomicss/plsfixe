import { getAllPostSlugs, getPostData } from '../../utils/markdownToHtml'; 
import Layout from '../../components/Layout';
import { getGoogleMapsData } from '../../utils/googleMapsApi';  
import { format, parseISO } from 'date-fns';

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
  let googleMapsData = { rating: null, user_ratings_total: null, googleMapsLink: null };

  if (postData.gmaps) {
    googleMapsData = await getGoogleMapsData(postData.gmaps); 
  }

  return {
    props: {
      postData,
      googleMapsData, 
    },
  };
}

const Post = ({ postData, googleMapsData }) => {
  const formattedDate = postData.date ? format(parseISO(postData.date), "MMM dd, yyyy") : '';

  return (
    <Layout>
      <article className="container mx-auto py-12 font-sans px-6">
        <h1 className="text-4xl font-bold font-serif mb-1">{postData.title}</h1>
        <h6 className="text-sm font-sans mt-0 ">{postData.category && ` ${postData.category}`}
                  {postData.neighborhood && ` \/ ${postData.neighborhood}`}
                </h6>
        <img
          src={postData.thumbnail}
          className="w-full h-96 object-cover mb-3 rounded-lg border-4 border-double border-black"
        />

        <div className="slug-buttons flex items-center justify-between mb-4 ">

        {/* Pls Fixe Categories */}
        <div className="border-4 border-double border-black rounded-lg h-12 w-72 p-4 flex items-center justify-center bg-gray-100 w-56 hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <div className="flex justify-center text-center">
            <div className="flex items-center">
              <div className="ml-0">
                <p className="text-md font-bold font-serif text-yellow-600 justify-center">
                  {postData.category && ` ${postData.category}`}
                  {postData.neighborhood && ` | ${postData.neighborhood}`}
                </p>
              </div>
            </div>
            </div>
        </div>

        {/* Google Maps Rating Box */}
        {googleMapsData?.rating && (
          <a
          href={googleMapsData.googleMapsLink}
          target="_blank"
          rel="noopener noreferrer">
            <div className="border-4 border-double border-black rounded-lg h-12 w-60 p-4 flex items-center justify-between bg-gray-100  w-68 hover:shadow-lg hover:text-yellow-600 transition-shadow duration-300">
            <div className="flex items-center">
              <img src="/images/google_maps_logo.png" alt="Google Maps" width={30} height={30} />
              <div className="ml-3">
                <span className="font-bold font-serif text-yellow-600">{googleMapsData.rating}</span>
                <span className="text-yellow-700 font-serif"> ({googleMapsData.user_ratings_total} reviews)</span>
              </div>
            </div>
          </div>
          </a>
        )}
        
        {/* Menu  */}
        <a href={postData.menu} target="_blank" rel="noopener noreferrer">
        <div className="border-4 border-double border-black font-serif rounded-lg h-12 w-56 p-4 flex items-center justify-center bg-gray-100  hover:shadow-lg hover:text-yellow-600 transition-shadow duration-300">
            <div className="flex justify-center text-center">
              <div className="flex items-center">
                  <p className="text-md text-yellow-600 font-bold text-center justify-center">
                Menu
              </p>
            </div>
            </div>
            </div>
          </a>

        {/* Pls Fixe Last Updated */}
        <div className="border-4 border-double border-black rounded-lg h-12 w-56 p-4 flex items-center justify-center bg-gray-100  hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-center text-center">
            <p className="text-sm font-serif text-yellow-600 text-center justify-center">
              <i>Last update: {formattedDate} </i>
            </p>
            </div>
        </div>
        </div>

        <div className="flex flex-col mb-2">
          <img src="/images/divider1.png" className="w-80 mx-auto" />
        </div>


        <div
          className="border-4 border-double border-black rounded-lg p-6 font-sans"
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
