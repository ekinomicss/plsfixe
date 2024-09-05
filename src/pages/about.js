import Layout from '../components/Layout';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 font-sans px-6">
        <h1 className="text-4xl font-bold font-serif mb-6">About Us</h1>
        <img src = "/images/plsfixe_logo_no_bg.png" className = "h-40 w-40 mb-5"></img>
        <p className="text-md mb-4">
          Welcome to PLS FIXE NYC! You might recognize us from our instagram, <a href = "https://instagram.com/plsfixenyc">@plsfixenyc.</a>
        </p>
        <p className="text-md mb-4">
          We wanted to start a blog to answer some of our friends' most existential questions: "Where should I dine tonight?", "What should I order?" and "What's the vibe??"
        </p>
        <p className="text-md mb-4">
          As a group of young professionals in the city, we are grateful to be able to have access to some of the best food in the world. We hope to share our experiences with you and help you make the most of your dining experiences in NYC!
        </p>
        <p className="text-md italic">
        For partnerships and promos, <a href = "/contact">contact us.</a>
        </p>
      </div>
    </Layout>
  );
};

export default About;
