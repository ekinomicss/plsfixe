import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <>
      <Header />
      <main className="container mx-auto px-20 py-20">
      <motion.div
      key={router.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
      </main>
      <Footer />
    </>
  );
}
