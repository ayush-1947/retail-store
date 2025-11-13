import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { useCart } from '../context/CartContext'; 

const ProductDetailPage = () => {
 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  
  const { id: productId } = useParams();
  const { addToCart } = useCart(); 
  const navigate = useNavigate(); 

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
  
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError('Product not found.');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);


  const addToCartHandler = () => {
    if (!userInfo) {
      
      navigate('/login?redirect=/product/' + productId);
    } else {
      
      addToCart(productId, quantity);
    }
  };

  
  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }
  
  return (
    <div>
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to Products
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/*  */}
        <div>
          <img
            src={product.imageUrl || 'https://picsum.photos/600/600'}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        
        {/*  */}
        <div>
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
          <p className="text-2xl font-semibold text-gray-900 mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="mb-4">
            {product.stock > 0 ? (
              <span className="font-semibold text-green-600">In Stock</span>
            ) : (
              <span className="font-semibold text-red-500">Out of Stock</span>
            )}
          </div>

          {product.stock > 0 && (
            <div className="flex items-center space-x-4">
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded p-2"
              >
                {[...Array(product.stock > 10 ? 10 : product.stock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
              
              <button
                onClick={addToCartHandler}
                className="bg-gray-800 text-white font-bold py-2 px-6 rounded hover:bg-gray-700 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
