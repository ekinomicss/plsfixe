import Layout from '../components/Layout';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold font-serif mb-6">About Us</h1>
        <p className="text-lg mb-4">
          Welcome to PLS FIXE NYC! We are a passionate team of food lovers dedicated to exploring the diverse culinary landscape of New York City.
        </p>
        <p className="text-lg mb-4">
          Our blog showcases the best local spots, hidden gems, and food experiences across the city. We believe in celebrating the unique flavors and stories behind every dish.
        </p>
        <p className="text-lg">
          Whether you're looking for food recommendations or curious about the latest trends, PLS FIXE NYC is here to guide you. Follow along as we taste our way through NYC’s vibrant food scene.
        </p>
      </div>
    </Layout>
  );
};

export default About;
