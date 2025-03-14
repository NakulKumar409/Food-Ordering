import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract search query and results from location state
  const { query, results } = location.state || { query: '', results: [] };

  const handleAddToCart = (item) => {
    // Implement add to cart logic
    const cartEvent = new CustomEvent('cartUpdated', { 
      detail: { 
        item, 
        action: 'add' 
      } 
    });
    window.dispatchEvent(cartEvent);
  };

  const handleViewDetails = (item) => {
    navigate(`/dish/${item.id}`, { state: { item } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Search Results for "{query}"
        </h1>
        <p className="text-gray-600 mt-2">
          {results.length} {results.length === 1 ? 'item' : 'items'} found
        </p>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl text-gray-600 mb-4">
            No results found
          </h2>
          <p className="text-gray-500">
            Try searching with a different keyword
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img 
                src={item.image ? `/assets/images/${item.image}` : '/assets/images/placeholder.png'} 
                alt={item.name} 
                onError={(e) => { e.target.src = '/assets/images/placeholder.png' }}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.name}
                </h2>
                <p className="text-gray-600 mb-4">
                  {item.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">
                    ₹{item.price}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewDetails(item)}
                      className="bg-indigo-500 text-white px-3 py-2 rounded-lg hover:bg-indigo-600 transition"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition flex items-center"
                    >
                      <FaShoppingCart className="mr-2" /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
