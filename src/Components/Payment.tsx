import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Globalstore/Store";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../Globalstore/Cartslice";
// Import the clearCart action

const PaymentPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch(); // Hook for dispatching actions

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock payment processing
    alert("Payment successful! Thank you for your purchase.");
    dispatch(clearCart()); // Clear the cart after payment
    navigate("/"); // Navigate to the home page
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        Payment Page
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Billing Information */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-sm space-y-4"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Billing Information
          </h3>
          {/* Form Inputs */}
          {/* (Full Name, Email, Address, Card Details) */}
          ```
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleInputChange}
            placeholder="Card Number"
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="text"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleInputChange}
            placeholder="Expiry Date"
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="text"
            name="cvv"
            value={formData.cvv}
            onChange={handleInputChange}
            placeholder="CVV"
            className="w-full p-3 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all"
          >
            Pay ${totalPrice.toFixed(2)}
          </button>
        </form>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Order Summary
          </h3>
          <ul className="space-y-3 mb-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
              >
                <span>{item.title}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between text-lg font-semibold text-gray-800">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
