import React from 'react';
import './About.css';

const About = () => {
    return (
        <section className="about">
            <div className="about-content">
                <div className="about-text">
                    <h2>About Us</h2>
                    <p>Star Loops Market is dedicated to providing high-quality, handmade crochet items. Our mission is to offer unique, sustainable, and beautifully crafted products that bring joy and warmth to your life. Whether you're looking for the perfect gift or something special for yourself, our diverse range of hats, bags, accessories, and more has something for everyone. Thank you for supporting small businesses and shopping sustainably! </p>
                </div>
                <img src={`${process.env.PUBLIC_URL}/crochet.jpg`} alt="About Us" />
            </div>
            <p>SHOP SMALL, SHOP SUSTAINABLE</p>
        </section>
    );
}

export default About;