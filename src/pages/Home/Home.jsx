import React from 'react';
import Banner from './Banner';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <HowItWorks></HowItWorks>
           <Testimonials></Testimonials>
        </div>
    );
};

export default Home;