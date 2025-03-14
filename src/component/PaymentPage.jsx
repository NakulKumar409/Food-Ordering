import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  FaCreditCard, 
  FaMobileAlt, 
  FaQrcode, 
  FaMoneyBillWave,
  FaGooglePay,
  FaApplePay,
  FaPaypal
} from 'react-icons/fa';
import { SiPhonepe, SiRazorpay } from 'react-icons/si';

// Replace with your actual Stripe publishable key
const stripePromise = loadStripe("pk_test_51OVpBUSBUxXXXXXXXXXXXXXXXXXXXX");

const PaymentMethods = [
  {
    id: 'credit_card',
    name: 'Credit/Debit Card',
    icon: <FaCreditCard className="text-3xl text-blue-600" />,
    component: CreditCardPayment,
    bgColor: 'bg-blue-50'
  },
  {
    id: 'upi',
    name: 'UPI Payment',
    icon: <FaMobileAlt className="text-3xl text-green-600" />,
    component: UPIPayment,
    bgColor: 'bg-green-50'
  },
  {
    id: 'phonepe',
    name: 'PhonePe',
    icon: <SiPhonepe className="text-3xl text-purple-600" />,
    component: PhonePePayment,
    bgColor: 'bg-purple-50'
  },
  {
    id: 'googlepay',
    name: 'Google Pay',
    icon: <FaGooglePay className="text-4xl text-green-500" />,
    component: GooglePayPayment,
    bgColor: 'bg-green-50'
  },
  {
    id: 'razorpay',
    name: 'Razorpay',
    icon: <SiRazorpay className="text-3xl text-blue-700" />,
    component: RazorpayPayment,
    bgColor: 'bg-blue-50'
  },
  {
    id: 'qr_code',
    name: 'QR Code',
    icon: <FaQrcode className="text-3xl text-indigo-600" />,
    component: QRCodePayment,
    bgColor: 'bg-indigo-50'
  },
  {
    id: 'cash_on_delivery',
    name: 'Cash on Delivery',
    icon: <FaMoneyBillWave className="text-3xl text-green-700" />,
    component: CashOnDelivery,
    bgColor: 'bg-green-50'
  }
];

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, total } = location.state || { cart: [], total: 0 };
  const [activeMethod, setActiveMethod] = useState(null);

  const renderPaymentMethod = () => {
    if (!activeMethod) return null;
    const SelectedComponent = activeMethod.component;
    return <SelectedComponent cart={cart} total={total} />;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Payment Methods Column */}
        <div className="w-full md:w-1/3 bg-gray-50 p-6 border-r border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Choose Payment Method
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
            {PaymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setActiveMethod(method)}
                className={`flex items-center p-4 rounded-lg transition-all duration-300 ${
                  activeMethod?.id === method.id 
                    ? 'bg-blue-100 shadow-md scale-105' 
                    : 'hover:bg-gray-100 hover:shadow-sm'
                } ${method.bgColor}`}
              >
                <div className="mr-4">{method.icon}</div>
                <span className="font-medium text-gray-800">{method.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Payment Details Column */}
        <div className="w-full md:w-2/3 p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700">
              Payment Details
            </h3>
            <p className="text-gray-500">
              Total Payable: ₹{total.toFixed(2)}
            </p>
          </div>

          {activeMethod ? (
            <div className="animate-fade-in">
              {renderPaymentMethod()}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              Select a payment method to proceed
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Payment Method Components (similar to previous implementation)
function CreditCardPayment({ total }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      navigate('/order-confirmation', {
        state: { 
          paymentMethod: paymentMethod,
          total,
          orderDate: new Date().toLocaleString()
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement 
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button 
        type="submit" 
        disabled={!stripe}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Pay ₹{total.toFixed(2)}
      </button>
    </form>
  );
}

function UPIPayment({ total }) {
  const [upiId, setUpiId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/order-confirmation', {
      state: { 
        paymentMethod: { type: 'UPI', upiId },
        total,
        orderDate: new Date().toLocaleString()
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input 
        type="text" 
        value={upiId}
        onChange={(e) => setUpiId(e.target.value)}
        placeholder="Enter UPI ID (e.g. mobile@upi)"
        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        required
      />
      <button 
        type="submit" 
        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
      >
        Pay via UPI
      </button>
    </form>
  );
}

// Placeholder components for other payment methods
function PhonePePayment({ total }) {
  const navigate = useNavigate();
  return (
    <div className="text-center space-y-4">
      <p>Redirecting to PhonePe...</p>
      <button 
        onClick={() => navigate('/order-confirmation', {
          state: { 
            paymentMethod: { type: 'PhonePe' },
            total,
            orderDate: new Date().toLocaleString()
          }
        })}
        className="w-full bg-purple-600 text-white py-3 rounded-lg"
      >
        Proceed with PhonePe
      </button>
    </div>
  );
}

function GooglePayPayment({ total }) {
  const navigate = useNavigate();
  return (
    <div className="text-center space-y-4">
      <p>Redirecting to Google Pay...</p>
      <button 
        onClick={() => navigate('/order-confirmation', {
          state: { 
            paymentMethod: { type: 'Google Pay' },
            total,
            orderDate: new Date().toLocaleString()
          }
        })}
        className="w-full bg-green-600 text-white py-3 rounded-lg"
      >
        Proceed with Google Pay
      </button>
    </div>
  );
}

function RazorpayPayment({ total }) {
  const navigate = useNavigate();
  return (
    <div className="text-center space-y-4">
      <p>Redirecting to Razorpay...</p>
      <button 
        onClick={() => navigate('/order-confirmation', {
          state: { 
            paymentMethod: { type: 'Razorpay' },
            total,
            orderDate: new Date().toLocaleString()
          }
        })}
        className="w-full bg-blue-700 text-white py-3 rounded-lg"
      >
        Proceed with Razorpay
      </button>
    </div>
  );
}

function QRCodePayment({ total }) {
  const navigate = useNavigate();
  return (
    <div className="text-center space-y-4">
      <img 
        src="/path/to/qr-code.png" 
        alt="Payment QR Code" 
        className="mx-auto max-w-xs rounded-lg shadow-md"
      />
      <button 
        onClick={() => navigate('/order-confirmation', {
          state: { 
            paymentMethod: { type: 'QR Code' },
            total,
            orderDate: new Date().toLocaleString()
          }
        })}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg"
      >
        I Have Completed Payment
      </button>
    </div>
  );
}

function CashOnDelivery({ total }) {
  const navigate = useNavigate();
  return (
    <div className="text-center space-y-4">
      <p className="text-gray-700 text-lg">
        Total Payable: ₹{total.toFixed(2)}
      </p>
      <p className="text-gray-600">
        Pay in cash when your order is delivered
      </p>
      <button 
        onClick={() => navigate('/order-confirmation', {
          state: { 
            paymentMethod: { type: 'Cash on Delivery' },
            total,
            orderDate: new Date().toLocaleString()
          }
        })}
        className="w-full bg-green-700 text-white py-3 rounded-lg"
      >
        Confirm Cash on Delivery
      </button>
    </div>
  );
}

export default PaymentPage;
