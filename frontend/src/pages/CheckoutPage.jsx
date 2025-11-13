import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CheckoutPage = () => {

  const { cartItems, loading, clearCart } = useCart();
  const navigate = useNavigate();
  
  
  const { name = '', email = '' } = JSON.parse(localStorage.getItem('userInfo')) || {};


  const [formData, setFormData] = useState({
    customerName: name,
    email: email,
    contactNumber: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [error, setError] = useState('');

  
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.10;
  const total = subtotal + tax;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const placeOrderHandler = async (e) => {
    e.preventDefault();
    setError(''); 

    try {
      const { customerName, email, contactNumber, address, city, postalCode, country } = formData;
      
    
      const { token } = JSON.parse(localStorage.getItem('userInfo'));


      const { data } = await axios.post(
        'http://localhost:5000/api/orders',
        {
          customerName,
          email,
          contactNumber,
          shippingAddress: { address, city, postalCode, country },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

   
      alert('Order placed successfully!');
      
     
      clearCart();
      navigate('/');
      
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order.');
    }
  };
  
  if (loading) return <div>Loading...</div>
  if (cartItems.length === 0 && !loading) {
     navigate('/'); 
     return null;
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {/*  */}
      <div className="md:col-span-2">
        <h1 className="text-2xl font-bold mb-6">Shipping Details</h1>
        <form onSubmit={placeOrderHandler} className="space-y-4 bg-white p-6 shadow-md rounded-lg">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="customerName" value={formData.customerName} onChange={handleInputChange} placeholder="Full Name" className="border p-2 rounded w-full" required />
            <input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className="border p-2 rounded w-full" required />
          </div>
          <input name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} placeholder="Contact Number" className="border p-2 rounded w-full" required />
          <input name="address" value={formData.address} onChange={handleInputChange} placeholder="Street Address" className="border p-2 rounded w-full" required />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input name="city" value={formData.city} onChange={handleInputChange} placeholder="City" className="border p-2 rounded w-full" required />
            <input name="postalCode" value={formData.postalCode} onChange={handleInputChange} placeholder="Postal Code" className="border p-2 rounded w-full" required />
            <input name="country" value={formData.country} onChange={handleInputChange} placeholder="Country" className="border p-2 rounded w-full" required />
          </div>

          {error && <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>}

          <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded hover:bg-green-700">
            Place Order
          </button>
        </form>
      </div>

      {/* */}
      <div className="md:col-span-1">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3 mb-4">
            {cartItems.map(item => (
              <div key={item.product._id} className="flex justify-between items-center">
                <span className="truncate w-2/3">{item.product.name} (x{item.quantity})</span>
                <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2 border-t pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (10%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-xl mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CheckoutPage;
