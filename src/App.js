import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import About from './components/About';
import Footer from './components/Footer';
import FAQ from './components/FAQ';
import Cart from './components/Cart';
import Shop from './components/Shop';
import './App.css';

function App() {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
    };

    const handleQuantityChange = (id, change) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
            )
        );
    };

    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
    };

    return (
        <Router basename="/starloops-market">
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<React.Fragment>
                        <Hero />
                        <FeaturedProducts />
                        <About />
                    </React.Fragment>} />
                    <Route path="/about" element={<About />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/cart" element={<Cart cartItems={cartItems} handleQuantityChange={handleQuantityChange} removeFromCart={removeFromCart} />} />
                    <Route path="/shop" element={<Shop addToCart={addToCart} />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
