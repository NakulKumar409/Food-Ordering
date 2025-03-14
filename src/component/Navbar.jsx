import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "/public/restaurant_48px.svg";
import { 
  FaSearch, FaTimes, FaBars, FaShoppingCart, 
  FaHome, FaUtensils, FaMapMarkerAlt, FaEnvelope 
} from 'react-icons/fa';
import { menuCategories } from './FoodItems';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check authentication status
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsAuthenticated(loggedIn);

    // Load cart items
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);

    // Listen for cart updates
    const handleCartUpdate = (event) => {
      const updatedCart = event.detail.cart;
      setCartItems(updatedCart);
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const handleSearch = useCallback(() => {
    if (searchQuery.trim()) {
      const results = Object.values(menuCategories)
        .flat()
        .filter(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
        );

      navigate('/search-results', { 
        state: { 
          query: searchQuery, 
          results: results 
        } 
      });
    }
  }, [searchQuery, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsAuthenticated(false);
    setCartItems([]);
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCartClick = () => {
    navigate("/order-summary", { 
      state: { cart: cartItems }
    });
  };

  return (
    <nav className="fixed w-full z-50 top-0 bg-gradient-to-r from-white via-white to-green-50 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Brand */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-3"
        >
          <Link to="/" className="flex items-center group">
            <img 
              src={Logo} 
              alt="Restaurant Logo" 
              className="h-10 mr-3 transition-transform group-hover:rotate-6 group-hover:scale-110"
            />
            <span className="text-2xl font-bold text-green-700 hidden sm:block">
              FoodHub
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:flex flex-grow justify-center items-center space-x-6 mx-8"
        >
          <Link 
            to="/" 
            className="flex items-center text-gray-700 hover:text-green-600 transition-all group"
          >
            <FaHome className="mr-2 group-hover:text-green-600" />
            Home
          </Link>
          <Link 
            to="/menu" 
            className="flex items-center text-gray-700 hover:text-green-600 transition-all group"
          >
            <FaUtensils className="mr-2 group-hover:text-green-600" />
            Menu
          </Link>
          <Link 
            to="/restaurants" 
            className="flex items-center text-gray-700 hover:text-green-600 transition-all group"
          >
            <FaMapMarkerAlt className="mr-2 group-hover:text-green-600" />
            Restaurants
          </Link>
          <Link 
            to="/contact" 
            className="flex items-center text-gray-700 hover:text-green-600 transition-all group"
          >
            <FaEnvelope className="mr-2 group-hover:text-green-600" />
            Contact
          </Link>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hidden md:flex items-center relative w-64"
        >
          <input 
            type="text" 
            placeholder="Search dishes..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full px-4 py-2 pl-10 bg-gray-100 text-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
          />
          <FaSearch className="absolute left-3 text-gray-500" />
        </motion.div>

        {/* Right Side Actions */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center space-x-4"
        >
          {/* Cart */}
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCartClick}
            className="relative text-gray-700 hover:text-green-600 transition-colors bg-transparent border border-green-500 rounded-full p-2 flex items-center justify-center"
          >
            <FaShoppingCart className="text-2xl text-green-600" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                {cartItems.length}
              </span>
            )}
          </motion.button>

          {/* Authentication Buttons */}
          {!isAuthenticated ? (
            <div className="flex space-x-2">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
                className="bg-transparent border border-green-500 text-green-600 px-4 py-2 rounded-full text-sm hover:bg-green-50 transition hidden md:block"
              >
                Login
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/signup')}
                className="bg-green-500 text-white px-4 py-2 rounded-full text-sm hover:bg-green-600 transition hidden md:block"
              >
                Sign Up
              </motion.button>
            </div>
          ) : (
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="bg-transparent border border-red-500 text-red-600 px-4 py-2 rounded-full text-sm hover:bg-red-50 transition hidden md:block"
            >
              Logout
            </motion.button>
          )}

          {/* Mobile Menu Toggle */}
          <motion.button 
            whileHover={{ rotate: 90 }}
            className="md:hidden text-gray-700 hover:text-green-600"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </motion.button>
        </motion.div>
      </div>

      {/* Mobile Menu (Slide-out) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed inset-0 bg-black bg-opacity-50 z-[60] md:hidden"
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween' }}
              className="absolute top-0 right-0 w-64 h-full bg-white shadow-xl"
            >
              <div className="p-6 border-b">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-green-700">FoodHub</span>
                  <button 
                    onClick={toggleMobileMenu}
                    className="text-gray-600 hover:text-red-600"
                  >
                    <FaTimes className="text-2xl" />
                  </button>
                </div>
                
                {/* Mobile Navigation Links */}
                <div className="space-y-4">
                  <Link 
                    to="/" 
                    onClick={toggleMobileMenu}
                    className="flex items-center text-gray-700 hover:text-green-600 transition-colors"
                  >
                    <FaHome className="mr-3 text-lg" /> Home
                  </Link>
                  <Link 
                    to="/menu" 
                    onClick={toggleMobileMenu}
                    className="flex items-center text-gray-700 hover:text-green-600 transition-colors"
                  >
                    <FaUtensils className="mr-3 text-lg" /> Menu
                  </Link>
                  <Link 
                    to="/restaurants" 
                    onClick={toggleMobileMenu}
                    className="flex items-center text-gray-700 hover:text-green-600 transition-colors"
                  >
                    <FaMapMarkerAlt className="mr-3 text-lg" /> Restaurants
                  </Link>
                  <Link 
                    to="/contact" 
                    onClick={toggleMobileMenu}
                    className="flex items-center text-gray-700 hover:text-green-600 transition-colors"
                  >
                    <FaEnvelope className="mr-3 text-lg" /> Contact
                  </Link>
                </div>

                {/* Mobile Authentication Buttons */}
                <div className="mt-6 space-y-3">
                  {!isAuthenticated ? (
                    <>
                      <button 
                        onClick={() => {
                          navigate('/login');
                          toggleMobileMenu();
                        }}
                        className="w-full bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
                      >
                        Login
                      </button>
                      <button 
                        onClick={() => {
                          navigate('/signup');
                          toggleMobileMenu();
                        }}
                        className="w-full bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition"
                      >
                        Sign Up
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => {
                        handleLogout();
                        toggleMobileMenu();
                      }}
                      className="w-full bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
                    >
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
