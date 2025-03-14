import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaShoppingCart, FaCheckCircle } from "react-icons/fa";

const OrderSummary = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });
  const [isCheckoutReady, setIsCheckoutReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    // Check if all shipping details are filled
    const allFieldsFilled = Object.values(shippingDetails).every(
      field => field.trim() !== ''
    );
    setIsCheckoutReady(allFieldsFilled && cartItems.length > 0);
  }, [shippingDetails, cartItems]);

  const removeFromCart = (itemToRemove) => {
    const updatedCart = cartItems.filter(item => item.id !== itemToRemove.id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(
      new CustomEvent('cartUpdated', { detail: { cart: updatedCart } })
    );
  };

  const handleShippingDetailsChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => 
      total + (item.price * (item.quantity || 1)), 0
    );
  };

  const calculateDiscountedTotal = () => {
    const subtotal = calculateTotal();
    const discount = cartItems.reduce((total, item) => 
      total + (item.price * (item.discount || 0) / 100 * (item.quantity || 1)), 0
    );
    return subtotal - discount;
  };

  const handleProceedToPayment = () => {
    if (!isCheckoutReady) {
      alert('Please fill in all shipping details and ensure cart is not empty');
      return;
    }

    navigate('/payment', { 
      state: { 
        cart: cartItems,
        total: calculateDiscountedTotal() * 1.1,  // Add 10% tax
        shippingDetails: shippingDetails
      } 
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Order Summary</h2>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12 bg-gray-100 rounded-lg">
          <FaShoppingCart className="text-6xl text-gray-400 mx-auto mb-4" />
          <p className="text-xl text-gray-600">Your cart is empty</p>
          <button 
            onClick={() => navigate('/menu')}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {/* Cart Items Column */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-2xl font-semibold">Cart Items</h3>
            {cartItems.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-24 h-24 object-cover rounded-md mr-4"
                  onError={(e) => e.target.src = 'https://via.placeholder.com/100'}
                />
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-600">₹{item.price}</p>
                  <p className="text-gray-500">Quantity: {item.quantity || 1}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item)}
                  className="text-red-500 hover:text-red-600 transition"
                >
                  <FaTrash className="text-xl" />
                </button>
              </div>
            ))}
          </div>

          {/* Shipping and Payment Column */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4">Shipping Details</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={shippingDetails.name}
                  onChange={handleShippingDetailsChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={shippingDetails.email}
                  onChange={handleShippingDetailsChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={shippingDetails.phone}
                  onChange={handleShippingDetailsChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Address</label>
                <textarea 
                  name="address"
                  value={shippingDetails.address}
                  onChange={handleShippingDetailsChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your delivery address"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">City</label>
                  <input 
                    type="text" 
                    name="city"
                    value={shippingDetails.city}
                    onChange={handleShippingDetailsChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="City"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Pincode</label>
                  <input 
                    type="text" 
                    name="pincode"
                    value={shippingDetails.pincode}
                    onChange={handleShippingDetailsChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Pincode"
                    required
                  />
                </div>
              </div>
            </form>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes (10%)</span>
                <span>₹{(calculateTotal() * 0.1).toFixed(2)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-xl">
                <span>Total</span>
                <span>₹{(calculateTotal() * 1.1).toFixed(2)}</span>
              </div>

              <button 
                onClick={handleProceedToPayment}
                disabled={!isCheckoutReady}
                className={`w-full py-3 rounded-lg text-white font-bold transition-colors ${
                  isCheckoutReady 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {isCheckoutReady ? (
                  <>
                    <FaCheckCircle className="inline-block mr-2" />
                    Proceed to Payment
                  </>
                ) : (
                  'Complete Shipping Details'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
