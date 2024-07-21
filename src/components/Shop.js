import React, { useState } from 'react';
import CustomOrder from './CustomOrder';
import './Shop.css';

const products = [
    {
        id: 1,
        name: 'Starfish Tote Bag',
        price: 30.00,
        category: 'Bags',
        inStock: true,
        image: process.env.PUBLIC_URL + '/starfishbag.webp'
    },
    {
        id: 2,
        name: 'Tomato Tote Bag',
        price: 30.00,
        category: 'Bags',
        inStock: true,
        image: process.env.PUBLIC_URL + '/tomatobag.webp'
    },
    {
        id: 3,
        name: 'Wrist Warmers',
        price: 20.00,
        category: 'Accessories',
        inStock: true,
        image: process.env.PUBLIC_URL + '/wristwarmers.webp'
    },
    {
        id: 4,
        name: 'Blueberry Bucket Hat',
        price: 25.00,
        category: 'Hats',
        inStock: true,
        image: process.env.PUBLIC_URL + '/blueberry.webp'
    },
    {
        id: 5,
        name: 'Ruffled Bag',
        price: 40.00,
        category: 'Bags',
        inStock: true,
        image: process.env.PUBLIC_URL + '/rufflebag.webp'
    },
    {
        id: 6,
        name: 'Pudding Plush',
        price: 15.00,
        category: 'Accessories',
        inStock: true,
        image: process.env.PUBLIC_URL + '/pudding.webp'
    },
    {
        id: 7,
        name: 'Coaster Set',
        price: 15.00,
        category: 'Accessories',
        inStock: true,
        image: process.env.PUBLIC_URL + '/coasters.webp'
    },
    {
        id: 8,
        name: 'Custom Order',
        price: null,
        category: 'Custom',
        inStock: true,
        image: process.env.PUBLIC_URL + '/starbag.jpg'
    }
];

const Shop = ({ addToCart }) => {
    const [filters, setFilters] = useState({
        category: 'All Items',
        priceRange: [],
        inStock: false,
    });
    const [sortOption, setSortOption] = useState('relevance');
    const [showCustomOrder, setShowCustomOrder] = useState(false);

    const getPriceRange = (price) => {
        if (price >= 15 && price <= 30) return '$15 - $30';
        if (price > 30 && price <= 50) return '$30 - $50';
        if (price > 50) return '$50+';
    };

    const handleCategoryChange = (category) => {
        setFilters({ ...filters, category });
    };

    const handlePriceRangeChange = (range) => {
        const newRange = filters.priceRange.includes(range)
            ? filters.priceRange.filter((r) => r !== range)
            : [...filters.priceRange, range];
        setFilters({ ...filters, priceRange: newRange });
    };

    const handleInStockChange = () => {
        setFilters({ ...filters, inStock: !filters.inStock });
    };

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const handleCustomOrderClick = () => {
        setShowCustomOrder(true);
    };

    const handleCloseCustomOrder = () => {
        setShowCustomOrder(false);
    };

    const handleAddToCart = (product) => {
        const itemToAdd = { ...product, quantity: 1 };
        addToCart(itemToAdd);
    };

    const filteredProducts = products.filter((product) => {
        const meetsCategory = filters.category === 'All Items' || product.category === filters.category;
        const meetsPriceRange = filters.priceRange.length === 0 || filters.priceRange.includes(getPriceRange(product.price));
        const meetsAvailability = !filters.inStock || product.inStock;

        return meetsCategory && meetsPriceRange && meetsAvailability;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOption === 'price-low-to-high') {
            return a.price - b.price;
        } else if (sortOption === 'price-high-to-low') {
            return b.price - a.price;
        } else {
            return 0; // Default is relevance, no sorting
        }
    });

    return (
        <div className="shop-container">
            <aside className="shop-sidebar">
                <h2>Browse by Category</h2>
                <ul>
                    <li onClick={() => handleCategoryChange('All Items')}>All Items</li>
                    <li onClick={() => handleCategoryChange('Hats')}>Hats</li>
                    <li onClick={() => handleCategoryChange('Bags')}>Bags</li>
                    <li onClick={() => handleCategoryChange('Accessories')}>Accessories</li>
                </ul>
                <h2>Price Range</h2>
                <ul>
                    <li>
                        <input
                            type="checkbox"
                            id="15-30"
                            name="price-range"
                            value="$15 - $30"
                            onChange={() => handlePriceRangeChange('$15 - $30')}
                        />
                        <label htmlFor="15-30">$15 - $30</label>
                    </li>
                    <li>
                        <input
                            type="checkbox"
                            id="30-50"
                            name="price-range"
                            value="$30 - $50"
                            onChange={() => handlePriceRangeChange('$30 - $50')}
                        />
                        <label htmlFor="30-50">$30 - $50</label>
                    </li>
                    <li>
                        <input
                            type="checkbox"
                            id="50+"
                            name="price-range"
                            value="$50+"
                            onChange={() => handlePriceRangeChange('$50+')}
                        />
                        <label htmlFor="50+">$50+</label>
                    </li>
                </ul>
                <h2>Availability</h2>
                <ul>
                    <li>
                        <input
                            type="checkbox"
                            id="in-stock"
                            name="availability"
                            value="In Stock"
                            onChange={handleInStockChange}
                        />
                        <label htmlFor="in-stock">In Stock</label>
                    </li>
                </ul>
            </aside>
            <main className="shop-main">
                <div className="shop-header">
                    <h2>{sortedProducts.length} results</h2>
                    <div className="shop-sort">
                        <label htmlFor="sort">Sort by</label>
                        <select id="sort" name="sort" value={sortOption} onChange={handleSortChange}>
                            <option value="relevance">Relevance</option>
                            <option value="price-low-to-high">Price: Low to High</option>
                            <option value="price-high-to-low">Price: High to Low</option>
                        </select>
                    </div>
                </div>
                <div className="product-grid">
                    {sortedProducts.map(product => (
                        <div key={product.id} className="product-item">
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>{product.price ? `$${product.price.toFixed(2)}` : 'Custom Price'}</p>
                            {product.name === 'Custom Order' ? (
                                <button onClick={handleCustomOrderClick}>Customize</button>
                            ) : (
                                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                            )}
                        </div>
                    ))}
                </div>
            </main>
            {showCustomOrder && <CustomOrder onClose={handleCloseCustomOrder} addToCart={addToCart} />}
        </div>
    );
};

export default Shop;
