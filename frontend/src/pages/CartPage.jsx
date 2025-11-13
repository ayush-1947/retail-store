import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, updateCartItem, removeCartItem, loading } = useCart();
  const navigate = useNavigate();

 
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

 
  const tax = subtotal * 0.10;
  const total = subtotal + tax;

  const checkoutHandler = () => {
    navigate('/checkout'); 
  };

  if (loading) {
    return <div className="text-center mt-10">Loading cart...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center p-6 bg-gray-100 rounded-lg">
          <p className="text-xl">Your cart is empty.</p>
          <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">
            Go Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* */}
          <div className="md:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.product._id} className="flex items-center border p-4 rounded-lg shadow-sm">
                  <img 
                    src={item.product.imageUrl || 'https://picsum.photos/100/100'} 
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded mr-4"
                  />
                  <div className="flex-grow">
                    <Link to={`/product/${item.product._id}`} className="font-semibold text-lg hover:underline">
                      {item.product.name}
                    </Link>
                    <p className="text-gray-600">${item.product.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {/*  */}
                    <select
                      value={item.quantity}
                      onChange={(e) => updateCartItem(item.product._id, Number(e.target.value))}
                      className="border rounded p-1"
                    >
                      {[...Array(item.product.stock > 10 ? 10 : item.product.stock).keys()].map(x => (
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      ))}
                    </select>
                    
                    {/*  */}
                    <button 
                      onClick={() => removeCartItem(item.product._id)}
                      className="text-red-500 hover:text-red-700 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/*  */}
          <div className="md:col-span-1">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-xl border-t pt-2 mt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={checkoutHandler}
                className="w-full bg-gray-800 text-white font-bold py-3 px-4 rounded hover:bg-gray-700 mt-6"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default CartPage;
