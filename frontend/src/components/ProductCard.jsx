import React from 'react';
import { Link } from 'react-router-dom'; // We'll use this to link to the product page

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <Link to={`/product/${product._id}`}>
        {/* Product Image */}
        <img
          src={product.imageUrl || 'https://picsum.photos/400/400'}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        
        <div className="p-4">
          {/* Product Name */}
          <h3 className="text-lg font-semibold truncate" title={product.name}>
            {product.name}
          </h3>
          
          {/* Price */}
          <p className="text-xl font-bold text-gray-900 mt-2">
            ${product.price.toFixed(2)}
          </p>
          
          {/* Stock Status */}
          <div className="mt-3">
            {product.stock > 0 ? (
              <span className="text-sm font-medium text-green-600">
                In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-sm font-medium text-red-500">
                Out of Stock
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;