import React, { Suspense, useEffect, useState } from "react";
import Banner from "./Banner";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import LatestItem from "./LatestItem";
import { motion } from "framer-motion";
import Spinner from "../../Components/Spinner";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/items", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => res.json())
      .then(() => setLoading(false))
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner />;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Banner />
      </motion.div>

      <Suspense fallback={<Spinner />}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <LatestItem />
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
