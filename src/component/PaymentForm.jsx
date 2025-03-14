import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#6772e5',
      color: '#6772e5',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883',
      },
      '::placeholder': {
        color: '#9BACC8',
      },
    },
    invalid: {
      iconColor: '#FFC7EE',
      color: '#FFC7EE',
    },
  },
};

const PaymentForm = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error('[error]', error);
      setPaymentStatus('error');
      setIsProcessing(false);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setPaymentStatus('success');
      
      // Simulate payment processing
      setTimeout(() => {
        // Clear cart in localStorage
        localStorage.removeItem('cart');
        
        // Navigate to order confirmation
        navigate('/order-confirmation', {
          state: { 
            paymentMethod: paymentMethod,
            orderDate: new Date().toLocaleString()
          }
        });
      }, 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <CardElement options={CARD_OPTIONS} />
      </div>

      {paymentStatus === 'error' && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          Payment failed. Please check your card details and try again.
        </div>
      )}

      <button 
        type="submit" 
        disabled={!stripe || isProcessing}
        className={`w-full py-3 rounded-lg text-white font-semibold transition-colors ${
          !stripe || isProcessing 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>

      {paymentStatus === 'success' && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          Payment processed successfully! Redirecting...
        </div>
      )}
    </form>
  );
};

export default PaymentForm;
