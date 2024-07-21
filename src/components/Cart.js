import React, { useState, useEffect } from 'react';
import './Cart.css';

const Cart = ({ cartItems, handleQuantityChange, removeFromCart }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [timeLeft, setTimeLeft] = useState(600); // 600 seconds = 10 minutes
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [userDetails, setUserDetails] = useState({
        name: '',
        address: '',
        email: '',
    });
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    useEffect(() => {
        let timerId;
        if (isTimerActive && timeLeft > 0) {
            timerId = setInterval(() => {
                setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            alert('Your session has expired.');
            setIsTimerActive(false);
            setCurrentStep(1);
        }

        return () => clearInterval(timerId);
    }, [isTimerActive, timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const handleNextStep = () => {
        if (currentStep === 1) {
            setIsTimerActive(true); // Start the timer when moving from Cart to Details
        }
        setCurrentStep(currentStep + 1);
    };

    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (currentStep === 2) {
            setUserDetails({ ...userDetails, [name]: value });
        } else if (currentStep === 3) {
            setPaymentDetails({ ...paymentDetails, [name]: value });
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="cart">
                        <h2>Cart</h2>
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} />
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <p>${item.price.toFixed(2)}</p>
                                    <div className="quantity-control">
                                        <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                                </div>
                            </div>
                        ))}
                        <div className="cart-subtotal">
                            <h3>Subtotal</h3>
                            <p>${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
                        </div>
                        <button onClick={handleNextStep}>Next</button>
                    </div>
                );
            case 2:
                return (
                    <div className="details">
                        <h2>Details</h2>
                        <input
                            type="text"
                            name="name"
                            value={userDetails.name}
                            onChange={handleInputChange}
                            placeholder="Name"
                        />
                        <input
                            type="text"
                            name="address"
                            value={userDetails.address}
                            onChange={handleInputChange}
                            placeholder="Address"
                        />
                        <input
                            type="email"
                            name="email"
                            value={userDetails.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                        />
                        <button onClick={handlePreviousStep}>Back</button>
                        <button onClick={handleNextStep}>Next</button>
                    </div>
                );
            case 3:
                return (
                    <div className="payment">
                        <h2>Payment</h2>
                        <input
                            type="text"
                            name="cardNumber"
                            value={paymentDetails.cardNumber}
                            onChange={handleInputChange}
                            placeholder="Card Number"
                        />
                        <input
                            type="text"
                            name="expiryDate"
                            value={paymentDetails.expiryDate}
                            onChange={handleInputChange}
                            placeholder="Expiry Date"
                        />
                        <input
                            type="text"
                            name="cvv"
                            value={paymentDetails.cvv}
                            onChange={handleInputChange}
                            placeholder="CVV"
                        />
                        <button onClick={handlePreviousStep}>Back</button>
                        <button onClick={() => alert('Purchase Complete!')}>Complete Purchase</button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="cart-container">
            <main className="cart-main">
                <h1>Checkout</h1>
                {isTimerActive && (
                    <div className="cart-timer">
                        <p>Time left to complete your purchase: {formatTime(timeLeft)}</p>
                    </div>
                )}
                <div className="cart-steps">
                    <div className={`step ${currentStep === 1 ? 'active' : ''}`}>1. Cart</div>
                    <div className={`step ${currentStep === 2 ? 'active' : ''}`}>2. Details</div>
                    <div className={`step ${currentStep === 3 ? 'active' : ''}`}>3. Payment</div>
                </div>
                {renderStep()}
            </main>
        </div>
    );
};

export default Cart;
