import '../styles/globals.css'; 
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="images/utensils_favicon.png" />  {/* Link to your favicon */}
        <title>Pls Fixe Nyc</title>             {/* Add page title */}
      </Head>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
