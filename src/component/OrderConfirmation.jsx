import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const OrderConfirmation = () => {
  const location = useLocation();
  const { paymentMethod, orderDate } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Order Confirmed!</h2>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-700 font-medium">
            Your payment has been processed successfully.
          </p>
        </div>

        {paymentMethod && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Payment Details</h3>
            <p className="text-gray-600">
              Payment Method: {paymentMethod.type.toUpperCase()}
            </p>
            <p className="text-gray-600">
              Card Last 4 Digits: **** **** **** {paymentMethod.card.last4}
            </p>
            <p className="text-gray-600">
              Order Date: {orderDate || new Date().toLocaleString()}
            </p>
          </div>
        )}

        <div className="flex justify-center space-x-4">
          <Link 
            to="/" 
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Back to Home
          </Link>
          <Link 
            to="/menu" 
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
