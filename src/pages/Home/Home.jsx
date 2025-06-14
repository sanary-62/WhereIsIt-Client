import React, { Suspense } from 'react';
import Banner from './Banner';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import LatestItem from './LatestItem';
import { motion } from "framer-motion";

const itemsPromise = fetch('http://localhost:3000/items').then(res => res.json());

const Home = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Banner />
      </motion.div>

      <Suspense fallback={'Loading Latest Items'}>
        <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <LatestItem itemsPromise={itemsPromise} />
      </motion.div>
      </Suspense>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <HowItWorks />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Testimonials />
      </motion.div>
    </div>
  );
};

export default Home;
