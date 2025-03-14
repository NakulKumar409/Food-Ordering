import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { restaurantData } from '../data/restaurantData';
import PaymentModal from './PaymentModal';
import './RestaurantPage.css';

const RestaurantPage = () => {
  const { restaurantId } = useParams();
  const [cart, setCart] = useState([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [restaurant, setRestaurant] = useState(null);

  // Load restaurant data and handle potential errors
  useEffect(() => {
    const foundRestaurant = restaurantData.find(r => r.id === parseInt(restaurantId));
    if (foundRestaurant) {
      setRestaurant(foundRestaurant);
    } else {
      console.error(`Restaurant with ID ${restaurantId} not found`);
    }
  }, [restaurantId]);

  const addToCart = (item) => {
    setCart(currentCart => {
      const existingItemIndex = currentCart.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex > -1) {
        const updatedCart = [...currentCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1
        };
        return updatedCart;
      }
      
      return [...currentCart, {...item, quantity: 1}];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(currentCart => 
      currentCart.filter(item => item.id !== itemId)
    );
  };

  const updateCartItemQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
    } else {
      setCart(currentCart => 
        currentCart.map(item => 
          item.id === itemId ? {...item, quantity: newQuantity} : item
        )
      );
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const discountedPrice = item.price * (1 - item.discount / 100);
      return total + (discountedPrice * item.quantity);
    }, 0).toFixed(2);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty. Please add items before checkout.');
      return;
    }
    
    // Immediately open payment modal
    setIsPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  const handlePaymentSuccess = () => {
    // Clear cart after successful payment
    setCart([]);
    setIsPaymentModalOpen(false);
    alert('Payment successful! Thank you for your order.');
  };

  if (!restaurant) {
    return <div className="text-center text-xl mt-10">Loading restaurant details...</div>;
  }

  return (
    <div className="restaurant-page container mx-auto px-4 py-8">
      <div className="restaurant-header mb-8">
        <h1 className="text-3xl font-bold mb-4">{restaurant.name}</h1>
        <p className="text-gray-600 mb-4">{restaurant.description}</p>
        
        {restaurant.location && (
          <div className="restaurant-location bg-gray-100 p-4 rounded-lg">
            <p>
              <strong>Location:</strong> {restaurant.location.city}, {restaurant.location.state}
            </p>
            <p>
              <strong>Pincode:</strong> {restaurant.location.pincode}
            </p>
          </div>
        )}
      </div>
      
      <div className="menu-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurant.menu.map(item => (
          <div key={item.id} className="menu-item border rounded-lg p-4 shadow-md">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-48 object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <div className="price-section flex justify-between items-center">
              <div>
                <span className="original-price text-gray-500 line-through mr-2">
                  ₹{item.price}
                </span>
                <span className="discount-badge bg-green-200 text-green-800 px-2 py-1 rounded-full">
                  {item.discount}% OFF
                </span>
              </div>
              <span className="discounted-price font-bold text-lg">
                ₹{(item.price * (1 - item.discount / 100)).toFixed(2)}
              </span>
            </div>
            <button 
              onClick={() => addToCart(item)}
              className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="cart-section mt-10 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
          {cart.map(item => (
            <div 
              key={item.id} 
              className="cart-item flex justify-between items-center border-b py-4"
            >
              <div className="flex items-center">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-16 h-16 object-cover rounded-lg mr-4"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">
                    ₹{(item.price * (1 - item.discount / 100)).toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <button 
                  onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                  className="bg-gray-200 px-3 py-1 rounded-l"
                >
                  -
                </button>
                <span className="px-4 py-1 bg-gray-100">{item.quantity}</span>
                <button 
                  onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                  className="bg-gray-200 px-3 py-1 rounded-r"
                >
                  +
                </button>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
          <div className="cart-total flex justify-between items-center mt-6">
            <h3 className="text-xl font-bold">Total: ₹{calculateTotal()}</h3>
            <button 
              onClick={handleCheckout}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      {isPaymentModalOpen && (
        <PaymentModal 
          cart={cart} 
          total={calculateTotal()} 
          onClose={handleClosePaymentModal}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default RestaurantPage;
