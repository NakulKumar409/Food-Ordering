import React, { useEffect, useState } from "react";

const PaymentModal = ({ cart, total, onClose, onPaymentSuccess }) => {
  // Validate props
  useEffect(() => {
    if (!cart || cart.length === 0) {
      console.error("No cart items provided");
      onClose();
    }
  }, [cart, onClose]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    paymentMethod: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const paymentMethods = [
    { id: "upi", name: "UPI", icon: "💳" },
    { id: "creditCard", name: "Credit Card", icon: "💳" },
    { id: "debitCard", name: "Debit Card", icon: "💳" },
    { id: "netBanking", name: "Net Banking", icon: "🏦" },
    { id: "cod", name: "Cash on Delivery", icon: "💵" },
  ];

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Phone validation (10-digit Indian mobile number)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    // Payment method validation
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = "Please select a payment method";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handlePaymentMethodSelect = (method) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethod: method,
    }));

    // Clear payment method error
    if (errors.paymentMethod) {
      setErrors((prev) => ({
        ...prev,
        paymentMethod: undefined,
      }));
    }
  };

  const processPayment = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate payment processing with more robust error simulation
      const paymentSimulation = new Promise((resolve, reject) => {
        setTimeout(() => {
          // Randomly simulate payment success/failure
          const randomSuccess = Math.random() > 0.1;
          randomSuccess
            ? resolve()
            : reject(new Error("Payment gateway error"));
        }, 1500);
      });

      await paymentSimulation;

      // Prepare invoice details
      const invoiceDetails = {
        customerName: formData.name,
        customerEmail: formData.email,
        phoneNumber: formData.phone,
        paymentMethod: formData.paymentMethod,
        total: parseFloat(total).toFixed(2),
        items: cart.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          discount: item.discount,
        })),
        date: new Date().toLocaleString(),
      };

      // Optional: Send invoice via EmailJS with better error handling
      try {
        // Uncomment and configure when ready
        // await emailjs.send(
        //   'service_food_menu',
        //   'template_invoice',
        //   invoiceDetails,
        //   'YOUR_USER_ID'
        // );
      } catch (emailError) {
        console.warn("Invoice email failed:", emailError);
        // Non-critical, so we'll continue with payment success
      }

      // Trigger payment success callback
      onPaymentSuccess();
    } catch (error) {
      console.error("Payment processing failed:", error);
      alert(
        `Payment failed: ${error.message || "Unknown error. Please try again."}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Complete Payment
        </h2>

        <form onSubmit={processPayment}>
          {/* Customer Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className={`w-full px-3 py-2 border rounded-md ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className={`w-full px-3 py-2 border rounded-md ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter 10-digit mobile number"
              maxLength="10"
              className={`w-full px-3 py-2 border rounded-md ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Payment Method */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Payment Method <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => handlePaymentMethodSelect(method.id)}
                  className={`p-2 rounded-lg border-2 transition-all ${
                    formData.paymentMethod === method.id
                      ? "border-green-500 bg-green-100"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}>
                  <span className="text-2xl block mb-1">{method.icon}</span>
                  <span className="text-xs">{method.name}</span>
                </button>
              ))}
            </div>
            {errors.paymentMethod && (
              <p className="text-red-500 text-xs mt-1">
                {errors.paymentMethod}
              </p>
            )}
          </div>

          {/* Total Amount */}
          <div className="mb-4 text-center">
            <p className="text-xl font-bold">Total: ₹{total}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between space-x-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="w-full py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 rounded-md transition ${
                isSubmitting
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}>
              {isSubmitting ? "Processing..." : "Pay Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
