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
      <article className="container mx-auto py-36 lg:py-12 md:py-12 font-sans px-4 sm:px-6 md:px-12">
        <h1 className="text-3xl sm:text-4xl font-bold font-serif mb-1">{postData.title}</h1>
        <h6 className="text-sm font-sans mt-0">
          {postData.category && ` ${postData.category}`}
          {postData.neighborhood && ` / ${postData.neighborhood}`}
        </h6>

        <img
          src={postData.thumbnail}
          className="w-full h-64 sm:h-80 md:h-96 object-cover mb-4 rounded-lg border-4 border-double border-black"
          alt="Post Thumbnail"
        />

        <div className="slug-buttons flex flex-col md:flex-row items-center justify-left mb-4 gap-2">
          <div className="rounded-lg h-11 w-full md:w-64 flex items-center justify-center bg-yellow-600 hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <span className="text-md font-bold font-serif text-white text-center">
              {postData.category && ` ${postData.category}`}
              {postData.neighborhood && ` | ${postData.neighborhood}`}
            </span>
          </div>

          {googleMapsData?.rating && (
            <a
              href={googleMapsData.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full md:w-64"
            >
              <div className="rounded-lg h-11 flex items-center justify-center bg-yellow-600 hover:shadow-lg hover:text-yellow-600 transition-shadow duration-300">
                <img src="/images/google_maps_logo.png" alt="Google Maps" width={20} height={20} className="mr-2" />
                <span className="font-bold font-serif text-white">{googleMapsData.rating}</span>
                <span className="text-white font-serif text-sm ml-1">({googleMapsData.user_ratings_total} reviews)</span>
              </div>
            </a>
          )}

          {postData?.menu && (
            <a href={postData.menu} target="_blank" rel="noopener noreferrer" className="block w-full md:w-64">
              <div className="font-serif rounded-lg h-11 flex items-center justify-center bg-yellow-600 hover:shadow-lg hover:text-yellow-600 transition-shadow duration-300">
                <span className="text-md text-white font-bold">Menu</span>
              </div>
            </a>
          )}

          <div className="rounded-lg h-11 w-full md:w-64 flex items-center justify-center bg-yellow-600 hover:shadow-lg transition-shadow duration-300">
            <span className="text-sm font-serif text-white text-center">
              <i>Last update: {formattedDate}</i>
            </span>
          </div>
        </div>

        <div className="flex flex-col mb-2">
          <img src="/images/divider1.png" className="w-64 sm:w-80 mx-auto" alt="Divider" />
        </div>

        <div className="border-4 border-black border-double rounded-lg p-4 sm:p-6 md:p-8 font-sans w-full">
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
          <MenuGallery images={menuImages} />
        </div>

        <div className="flex flex-col mt-2">
          <img src="/images/divider1_bottom.png" className="w-64 sm:w-80 mx-auto" alt="Divider Bottom" />
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