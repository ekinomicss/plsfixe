import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Search from '../utils/Search'; // Import the Search component to check for it

export default function Layout({ children }) {
  const router = useRouter();

  // Check if `children` is the `Search` component
  const isSearchComponent = React.Children.toArray(children).some(
    (child) => child.type === Search
  );

  return (
    <>
      <Header />
      <main className="container mx-auto px-20 py-20">
        {!isSearchComponent ? (
          <motion.div
            key={router.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        ) : (
          children // Render `Search` without `motion.div`
        )}
      </main>
      <Footer />
    </>
  );
}
