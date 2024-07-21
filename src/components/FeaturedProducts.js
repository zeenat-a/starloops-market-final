import React from 'react';
import './FeaturedProducts.css';

const FeaturedProducts = () => {
    const products = [
        { id: 1, name: 'Snoopy Themed Bag', img: process.env.PUBLIC_URL + '/snoopybag.webp' },
        { id: 2, name: 'Wrist Warmers', img: process.env.PUBLIC_URL + '/wristwarmers.webp' },
        { id: 3, name: 'Starfish Tote Bag', img: process.env.PUBLIC_URL + '/starfishbag.webp' },
    ];

    return (
        <section className="featured-products">
            <h2>Featured Products</h2>
            <div className="product-list">
                {products.map(product => (
                    <div key={product.id} className="product-item">
                        <img src={product.img} alt={product.name} />
                        <h3>{product.name}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default FeaturedProducts;