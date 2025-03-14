import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12">
      {/* Location Map */}
      <div className="w-full h-[300px] relative mb-12">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.8887130520255!2d77.11552731508565!3d28.697116982395947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03c34fb126e3%3A0xb897d8908c96a256!2sMaharaja%20Agrasen%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1645524532496!5m2!1sen!2sin"
          className="w-full h-full border-0"
          loading="lazy"
          title="Location Map"
          allowFullScreen=""
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">About Us</h3>
            <p className="text-lg text-gray-400 leading-relaxed mb-6">
              MAIT Food Delivery brings your favorite restaurants right to your doorstep. 
              Enjoy the best food delivery experience with quick service and great taste.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-lg text-gray-400 hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-lg text-gray-400 hover:text-blue-600 transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-lg text-gray-400 hover:text-blue-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-lg text-gray-400 hover:text-blue-600 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-lg text-gray-400"> East kamla nagar,Vivekanand Colony Bhopal pin 462022</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-lg text-gray-400">nakulkumar7319@gmail.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-lg text-gray-400">+91 9065015409 </span>
              </li>
            </ul>
          </div>

          {/* Opening Hours & Social Links */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Opening Hours</h3>
            <ul className="space-y-4 mb-8">
              <li className="text-lg text-gray-400">Monday - Friday: 10:00 AM - 10:00 PM</li>
              <li className="text-lg text-gray-400">Saturday: 11:00 AM - 11:00 PM</li>
              <li className="text-lg text-gray-400">Sunday: 12:00 PM - 9:00 PM</li>
            </ul>

            {/* Social Links */}
            <div>
              <h4 className="text-xl font-bold text-white mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://www.instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <FaInstagram size={40} />
                </a>
                <a 
                  href="https://www.facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <FaFacebook size={40} />
                </a>
                <a 
                  href="https://www.linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <FaLinkedin size={40} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-lg text-gray-400"> {new Date().getFullYear()} MAIT Food Delivery. All rights reserved.</p>
            <div className="flex space-x-8">
              <Link to="/privacy" className="text-lg text-gray-400 hover:text-blue-600 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-lg text-gray-400 hover:text-blue-600 transition-colors">
                Terms of Service
              </Link>
              <Link to="/faq" className="text-lg text-gray-400 hover:text-blue-600 transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
