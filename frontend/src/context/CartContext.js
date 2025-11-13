import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';


const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));


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


  useEffect(() => {
    const fetchCart = async () => {
      if (!userInfo) {
        setLoading(false);
        return; 
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
  }, [userInfo?.token]); 



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
      alert('Item added to cart!'); 
    } catch (error) {
      console.error('Failed to add to cart', error);
      alert('Failed to add item. See console.');
    }
  };


  const updateCartItem = async (productId, quantity) => {
    if (quantity <= 0) return; 
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
};


export const useCart = () => {
  return useContext(CartContext);
};
