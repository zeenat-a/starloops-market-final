import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    const navigate = useNavigate();

    const handleShopAllClick = () => {
        navigate('/shop');
    };

    return (
        <section className="hero">
            <img src={`${process.env.PUBLIC_URL}/home.jpg`} alt="Star Loops Market" />
            <div className="hero-text">
                <h1>Star Loops Market</h1>
                <button onClick={handleShopAllClick}>Shop All</button>
            </div>
        </section>
    );
}

export default Hero;