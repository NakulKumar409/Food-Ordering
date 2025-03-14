import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSearch, 
  FaUtensils, 
  FaMapMarkerAlt, 
  FaShoppingCart 
} from 'react-icons/fa';
import heroBackground from '/southfood1.jpg';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic
    console.log('Searching for:', searchQuery);
    setSearchQuery('');
  };

  return (
    <div 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center" 
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <div className="relative z-10 text-center text-white px-4 py-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Discover Delicious Meals Near You
        </h1>
        
        <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
          Explore a world of culinary delights from the best local restaurants
        </p>
        
        <form onSubmit={handleSearch} className="max-w-xl mx-auto flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-grow w-full md:w-auto">
            <input
              type="text"
              placeholder="Search restaurants, cuisines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button 
            type="submit" 
            className="w-full md:w-auto bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center justify-center"
          >
            <FaSearch className="mr-2" /> Search
          </button>
        </form>
        
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <Link 
            to="/menu" 
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-6 text-center transition duration-300"
          >
            <FaUtensils className="mx-auto text-4xl mb-4 text-indigo-300" />
            <span className="font-semibold">Explore Menu</span>
          </Link>
          
          <Link 
            to="/restaurants" 
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-6 text-center transition duration-300"
          >
            <FaMapMarkerAlt className="mx-auto text-4xl mb-4 text-indigo-300" />
            <span className="font-semibold">Nearby Restaurants</span>
          </Link>
          
          <Link 
            to="/cart" 
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-6 text-center transition duration-300"
          >
            <FaShoppingCart className="mx-auto text-4xl mb-4 text-indigo-300" />
            <span className="font-semibold">View Cart</span>
          </Link>
          
          <Link 
            to="/offers" 
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-6 text-center transition duration-300"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-10 w-10 mx-auto mb-4 text-indigo-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <span className="font-semibold">Special Offers</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;