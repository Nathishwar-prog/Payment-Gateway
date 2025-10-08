
import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <div className="aspect-w-1 aspect-h-1 bg-gray-200">
        <img src={product.image} alt={product.name} className="w-full h-full object-center object-cover" />
      </div>
      <div className="flex-1 p-4 space-y-2 flex flex-col">
        <h3 className="text-lg font-medium text-gray-900">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <div className="flex-1 flex flex-col justify-end">
          <p className="text-xl font-semibold text-gray-900">${product.price.toFixed(2)}</p>
        </div>
      </div>
       <button
        onClick={handleAddToCart}
        className="relative z-10 w-full bg-brand-accent text-white py-2 px-4 text-sm font-medium rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Add to Cart
      </button>
    </div>
  );
};
