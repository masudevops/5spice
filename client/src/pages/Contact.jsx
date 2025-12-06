import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for contacting us! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-brand-red text-center mb-12">Get in Touch</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Info & Map */}
                <div className="space-y-8">
                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-brand-gold">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Clock className="text-brand-red" /> Store Hours
                        </h2>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex justify-between border-b pb-2"><span>Mon - Thu</span> <span>9:00 AM - 10:00 PM</span></li>
                            <li className="flex justify-between border-b pb-2"><span>Fri - Sat</span> <span>9:00 AM - 11:00 PM</span></li>
                            <li className="flex justify-between"><span>Sun</span> <span>9:00 AM - 10:00 PM</span></li>
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-brand-green">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <MapPin className="text-brand-green" /> Location
                        </h2>
                        <p className="text-gray-600 mb-4">123 Halal Ave, Dallas, TX 75001</p>
                        {/* Mock Map */}
                        <div className="w-full h-48 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                            Google Maps Placeholder
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                            <input
                                type="text"
                                required
                                className="w-full p-3 border border-gray-300 rounded focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input
                                type="email"
                                required
                                className="w-full p-3 border border-gray-300 rounded focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Message</label>
                            <textarea
                                rows="4"
                                required
                                className="w-full p-3 border border-gray-300 rounded focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition"
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-brand-red text-white font-bold py-3 rounded hover:bg-red-700 transition"
                        >
                            SendMessage
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
