import React, { useState } from 'react';
import './CustomOrder.css';

const CustomOrder = ({ onClose, addToCart }) => {
    const [color, setColor] = useState('');
    const [features, setFeatures] = useState([]);

    const handleFeatureChange = (feature) => {
        setFeatures(prevFeatures =>
            prevFeatures.includes(feature)
                ? prevFeatures.filter(f => f !== feature)
                : [...prevFeatures, feature]
        );
    };

    const handleSubmit = () => {
        const customItem = {
            id: Math.random().toString(36).substr(2, 9), // Generate a random id for the item
            name: 'Custom Bag',
            price: 50.00, // Assign a default price or calculate based on features
            quantity: 1,
            color,
            features,
            image: process.env.PUBLIC_URL + '/starbag.jpg'
        };
        addToCart(customItem);
        onClose();
    };

    return (
        <div className="custom-order-modal">
            <div className="custom-order-content">
                <h2>Customize Your Bag</h2>
                <label>
                    Choose Color:
                    <select value={color} onChange={(e) => setColor(e.target.value)}>
                        <option value="">Select Color</option>
                        <option value="Red">Red</option>
                        <option value="Blue">Blue</option>
                        <option value="Green">Green</option>
                    </select>
                </label>
                <div>
                    <h3>Choose Features:</h3>
                    <label>
                        <input
                            type="checkbox"
                            checked={features.includes('Frilly Trim')}
                            onChange={() => handleFeatureChange('Frilly Trim')}
                        />
                        Frilly Trim
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={features.includes('Fluffy Bow')}
                            onChange={() => handleFeatureChange('Fluffy Bow')}
                        />
                        Fluffy Bow
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={features.includes('Sea Life Beads')}
                            onChange={() => handleFeatureChange('Sea Life Beads')}
                        />
                        Sea Life Beads
                    </label>
                </div>
                <button onClick={handleSubmit}>Add to Cart</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default CustomOrder;
