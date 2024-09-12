import Layout from '../components/Layout';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 font-sans px-6">
        <h1 className="text-4xl font-bold font-serif mb-6 hover:text-yellow-500 duration-300 ease-in-out ">About</h1>
        <img src = "/images/plsfixe_logo_no_bg.png" className = "h-40 w-40 mb-5 block mx-auto"></img>
      <div className="flex flex-col space-y-0 mb-7">
        <img src = "/images/divider1.png" className="w-80 mx-auto"></img>
      </div>
        <p className="text-lg mb-4 text-center">
          Welcome to PLS FIXE NYC! You might recognize us from our instagram, <a href = "https://instagram.com/plsfixenyc">@plsfixenyc.</a>
        </p>
        <p className="text-md mb-4 text-center">
          We wanted to start a blog to answer some of our friends' most existential questions: "Where should I dine tonight?", "What should I order?" and "What's the vibe??"
        </p>
        <p className="text-md mb-4 text-center">
          Due to our small size, we are only covering Manhatan and Brooklyn. We hoping to extend to other boroughs as we grow.        </p>
        <p className="text-md mb-4 text-center">
          As a group of young professionals in the city, we are grateful to be able to have access to some of the best food in the world. We hope to share our experiences with you and help you make the most of your dining experiences in NYC!
        </p>
        <p className="text-md italic text-center">
        For partnerships and promos, <a href = "/contact">contact us.</a>
        </p>
        <div className="flex flex-col space-y-0 mt-6">
        <img src = "/images/divider1_bottom.png" className="w-80 mx-auto"></img>
      </div>
      </div>
    </Layout>
  );
};

export default About;
