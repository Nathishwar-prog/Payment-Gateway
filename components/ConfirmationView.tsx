import React from 'react';
import { CartItem, Page } from '../types';

interface ConfirmationViewProps {
  orderItems: CartItem[];
  setPage: (page: Page) => void;
}

export const ConfirmationView: React.FC<ConfirmationViewProps> = ({ orderItems, setPage }) => {
  if (!orderItems || orderItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-medium text-gray-900">No order details found.</h2>
        <div className="mt-6">
          <button onClick={() => setPage('products')} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-accent hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }
  
  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-xl">
          <p className="text-sm font-medium text-brand-accent">Payment successful</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">Thanks for ordering!</h1>
          <p className="mt-2 text-base text-gray-500">We appreciate your order, we’re currently processing it. So hang tight and we’ll send you confirmation very soon!</p>

          <dl className="mt-12 text-sm font-medium">
            <dt className="text-gray-900">Order number</dt>
            <dd className="text-brand-accent mt-2">{Math.random().toString(36).substr(2, 9).toUpperCase()}</dd>
          </dl>
        </div>

        <section aria-labelledby="order-heading" className="mt-10 border-t border-gray-200">
          <h2 id="order-heading" className="sr-only">Your order</h2>

          <h3 className="sr-only">Items</h3>
          {orderItems.map((item) => (
            <div key={item.id} className="py-10 border-b border-gray-200 flex space-x-6">
              <img src={item.image} alt={item.name} className="flex-none w-20 h-20 object-center object-cover bg-gray-100 rounded-lg sm:w-40 sm:h-40" />
              <div className="flex-auto flex flex-col">
                <div>
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-600">{item.category}</p>
                </div>
                <div className="mt-6 flex-1 flex items-end">
                  <dl className="flex text-sm divide-x divide-gray-200 space-x-4 sm:space-x-6">
                    <div className="flex">
                      <dt className="font-medium text-gray-900">Quantity</dt>
                      <dd className="ml-2 text-gray-700">{item.quantity}</dd>
                    </div>
                    <div className="pl-4 flex sm:pl-6">
                      <dt className="font-medium text-gray-900">Price</dt>
                      <dd className="ml-2 text-gray-700">${(item.price * item.quantity).toFixed(2)}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          ))}

          <div className="sm:ml-40 sm:pl-6">
            <dl className="text-sm font-medium text-gray-500 mt-10 space-y-6">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd className="text-gray-900">${total.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Taxes</dt>
                <dd className="text-gray-900">$0.00</dd>
              </div>
              <div className="flex justify-between border-t border-gray-200 text-gray-900 pt-6">
                <dt className="text-base">Total</dt>
                <dd className="text-base">${total.toFixed(2)}</dd>
              </div>
            </dl>
          </div>
        </section>
        
        <div className="mt-16 border-t border-gray-200 py-6 text-right">
          <button onClick={() => setPage('products')} className="text-sm font-medium text-brand-accent hover:text-blue-500">Continue Shopping<span aria-hidden="true"> &rarr;</span></button>
        </div>
      </div>
    </div>
  );
};