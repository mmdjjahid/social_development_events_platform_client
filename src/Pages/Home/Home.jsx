import React from 'react';
import Banner from './Banner';
import Feature from './Feature';
import Gallery from './Gallery';
import Newsletter from './Newsletter';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Feature></Feature>
            <Gallery></Gallery>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;