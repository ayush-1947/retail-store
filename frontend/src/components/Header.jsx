import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; 

const Header = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart(); 
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));


  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
 
    window.location.href = '/login';
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">
          AXS Solution
        </Link>
        
        <div className="flex items-center space-x-6">
          {/*  Cart Icon with Dynamic Count */}
          <Link to="/cart" className="relative">
            <span className="text-2xl">🛒</span>
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          </Link>

          {/* Auth Links */}
          {userInfo ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Hi, {userInfo.name}</span>
              <button
                onClick={logoutHandler}
                className="text-sm bg-red-600 px-3 py-1 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/login" className="hover:text-gray-300">Login</Link>
              <Link to="/register" className="hover:text-gray-300">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
