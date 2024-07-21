import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
    const [open, setOpen] = useState(null);
    const [form, setForm] = useState({
        name: '',
        email: '',
        question: ''
    });
    const [language, setLanguage] = useState('en');

    const toggle = (index) => {
        if (open === index) {
            setOpen(null);
        } else {
            setOpen(index);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', form);
        // Clear the form
        setForm({ name: '', email: '', question: '' });
    };

    const toggleLanguage = () => {
        setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'fr' : 'en'));
    };

    const faqData = {
        en: [
            { question: 'Do you ship internationally?', answer: 'Yes, we ship worldwide.' },
            { question: 'Do you accept returns?', answer: 'Yes, returns are accepted within 30 days.' },
            { question: 'How do I place a custom order?', answer: 'Contact us with your requirements.' },
            { question: 'How can I track my order?', answer: 'You will receive a tracking link via email.' },
        ],
        fr: [
            { question: 'Expédiez-vous à l\'international?', answer: 'Oui, nous expédions dans le monde entier.' },
            { question: 'Acceptez-vous les retours?', answer: 'Oui, les retours sont acceptés dans les 30 jours.' },
            { question: 'Comment passer une commande personnalisée?', answer: 'Contactez-nous avec vos exigences.' },
            { question: 'Comment puis-je suivre ma commande?', answer: 'Vous recevrez un lien de suivi par email.' },
        ]
    };

    const formLabels = {
        en: {
            name: 'Name:',
            email: 'Email:',
            question: 'Question(s):',
            submit: 'Submit',
            feedback: 'Have more questions? Ask us!',
            faq: 'FAQ'
        },
        fr: {
            name: 'Nom:',
            email: 'E-mail:',
            question: 'Question(s):',
            submit: 'Soumettre',
            feedback: 'Vous avez plus de questions? Demandez-nous!',
            faq: 'FAQ'
        }
    };

    const currentFaq = faqData[language];
    const currentLabels = formLabels[language];

    return (
        <div className="faq-container">
            <main className="faq-main">
                <div className="faq-header">
                    <h1>{currentLabels.faq}</h1>
                    <button onClick={toggleLanguage} className="language-toggle">
                        {language === 'en' ? 'Français' : 'English'}
                    </button>
                </div>
                {currentFaq.map((item, index) => (
                    <div key={index} className="faq-item" onClick={() => toggle(index)}>
                        <h2>{item.question} <span className="faq-icon">{open === index ? <i className="fas fa-minus"></i> : <i className="fas fa-plus"></i>}</span></h2>
                        {open === index && <p>{item.answer}</p>}
                    </div>
                ))}
                <div className="feedback-form">
                    <h2>{currentLabels.feedback}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">{currentLabels.name}</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">{currentLabels.email}</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="question">{currentLabels.question}</label>
                            <textarea
                                id="question"
                                name="question"
                                value={form.question}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit">{currentLabels.submit}</button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default FAQ;