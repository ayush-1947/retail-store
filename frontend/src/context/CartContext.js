import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// 1. Create the Context
const CartContext = createContext();

// 2. Create the Provider (a component that wraps our app)
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get user info (and token) from localStorage
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // --- Helper Function: Get Auth Headers ---
  const getAuthHeaders = () => {
    if (userInfo && userInfo.token) {
      return {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
    }
    return {};
  };

  // --- Effect: Fetch Cart on Load ---
  useEffect(() => {
    const fetchCart = async () => {
      if (!userInfo) {
        setLoading(false);
        return; // Don't fetch if no user
      }
      try {
        const { data } = await axios.get('http://localhost:5000/api/cart', getAuthHeaders());
        setCartItems(data.items || []);
      } catch (error) {
        console.error('Failed to fetch cart', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [userInfo?.token]); // Re-run if token changes (login/logout)


  // --- Function: Add to Cart ---
  const addToCart = async (productId, quantity) => {
    if (!userInfo) {
      console.error('You must be logged in to add to cart');
      return;
    }
    
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/cart',
        { productId, quantity },
        getAuthHeaders()
      );
      setCartItems(data.items);
      alert('Item added to cart!'); // Simple user feedback
    } catch (error) {
      console.error('Failed to add to cart', error);
      alert('Failed to add item. See console.');
    }
  };

  // --- Function: Update Cart Item ---
  const updateCartItem = async (productId, quantity) => {
    if (quantity <= 0) return; // Prevent 0 or negative
    try {
      const { data } = await axios.put(
        'http://localhost:5000/api/cart',
        { productId, quantity },
        getAuthHeaders()
      );
      setCartItems(data.items);
    } catch (error) {
      console.error('Failed to update cart item', error);
    }
  };

  // --- Function: Remove From Cart ---
  const removeCartItem = async (productId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/cart/${productId}`,
        getAuthHeaders()
      );
      setCartItems(data.items);
    } catch (error) {
      console.error('Failed to remove cart item', error);
    }
  };

  const clearCart = () => {
  setCartItems([]);
};

  // --- Provide all values to the app ---
  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        loading,
        addToCart, 
        updateCartItem,
        removeCartItem,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider> // <-- Corrected the typo here
  );
}; // <-- This is the only closing brace for CartProvider

// 3. Create a custom hook to easily use the context
export const useCart = () => {
  return useContext(CartContext);
};