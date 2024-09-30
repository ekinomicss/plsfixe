import { getAllPostSlugs, getPostData } from '../../utils/markdownToHtml'; 
import Layout from '../../components/Layout';
import { getGoogleMapsData } from '../../utils/googleMapsApi';  
import { format, parseISO } from 'date-fns';
import MenuGallery from '../../components/MenuGallery';
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

  const menuImages = [
    postData.menu1,
    postData.menu2,
    postData.menu3,
    postData.menu4,
    postData.menu5,
    postData.menu6,
  ].filter(Boolean);

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

        <div className="slug-buttons flex items-center justify-left mb-4 gap-2">

          {/* Pls Fixe Categories */}
          <div className="border-4 border-double border-black rounded-lg h-11 w-64 flex items-center justify-center bg-gray-100 hover:shadow-lg transition-shadow duration-300 ease-in-out">
                  <span className="text-md font-bold font-serif text-yellow-600 text-center">
                    {postData.category && ` ${postData.category}`}
                    {postData.neighborhood && ` | ${postData.neighborhood}`}
                  </span>
          </div>

          {/* Google Maps Rating Box */}
          {googleMapsData?.rating && (
            <a
              href={googleMapsData.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="border-4 border-double border-black rounded-lg h-11 w-64 flex items-center justify-center bg-gray-100 hover:shadow-lg hover:text-yellow-600 transition-shadow duration-300">
                <img src="/images/google_maps_logo.png" alt="Google Maps" width={20} height={20} className="mr-2" />
                <span className="font-bold font-serif text-yellow-600">{googleMapsData.rating}</span>
                <span className="text-yellow-700 font-serif text-sm ml-1">({googleMapsData.user_ratings_total} reviews)</span>
              </div>
            </a>
          )}
          
          {/* Menu */}
          {postData?.menu && (
          <a href={postData.menu} target="_blank" rel="noopener noreferrer" className="block">
            <div className="border-4 border-double border-black font-serif rounded-lg h-11 w-64 flex items-center justify-center bg-gray-100 hover:shadow-lg hover:text-yellow-600 transition-shadow duration-300">
              <span className="text-md text-yellow-600 font-bold">
                Menu
              </span>
            </div>
          </a>
          )}

          {/* Pls Fixe Last Updated */}
          <div className="border-4 border-double border-black rounded-lg h-11 w-64 flex items-center justify-center bg-gray-100 hover:shadow-lg transition-shadow duration-300">
            <span className="text-sm font-serif text-yellow-600 text-center">
              <i>Last update: {formattedDate}</i>
            </span>
          </div>
        </div>

        <div className="flex flex-col mb-2">
          <img src="/images/divider1.png" className="w-80 mx-auto" />
        </div>

        <div className="border-4 border-double border-black rounded-lg p-6 font-sans">
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
          <MenuGallery images={menuImages} />
        </div>
       
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
