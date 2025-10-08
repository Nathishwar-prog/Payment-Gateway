
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../store/cartSlice';
import { Page } from '../types';

interface CartViewProps {
  setPage: (page: Page) => void;
}

export const CartView: React.FC<CartViewProps> = ({ setPage }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-8">Shopping Cart</h1>
        {cartItems.length > 0 ? (
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">Items in your shopping cart</h2>
              <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48" />
                    </div>
                    <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm"><a href="#" className="font-medium text-gray-700 hover:text-gray-800">{item.name}</a></h3>
                          </div>
                          <p className="mt-1 text-sm font-medium text-gray-900">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="mt-4 sm:mt-0 sm:pr-9">
                          <div className="flex items-center">
                            <button onClick={() => dispatch(decrementQuantity(item.id))} className="px-2 py-1 border rounded-md">-</button>
                            <span className="mx-2">{item.quantity}</span>
                            <button onClick={() => dispatch(incrementQuantity(item.id))} className="px-2 py-1 border rounded-md">+</button>
                          </div>
                          <div className="absolute top-0 right-0">
                            <button onClick={() => dispatch(removeFromCart(item.id))} className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500">
                              <span className="sr-only">Remove</span>
                              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
            
            <section aria-labelledby="summary-heading" className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5">
              <h2 id="summary-heading" className="text-lg font-medium text-gray-900">Order summary</h2>
              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
                </div>
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-900">Order total</dt>
                  <dd className="text-base font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
                </div>
              </dl>
              <div className="mt-6">
                <button onClick={() => setPage('payment')} className="w-full bg-brand-accent border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500">
                  Proceed to Payment
                </button>
              </div>
               <div className="mt-6 text-sm text-center">
                <p>or <button onClick={() => setPage('products')} className="font-medium text-brand-accent hover:text-blue-500">Continue Shopping<span aria-hidden="true"> &rarr;</span></button></p>
              </div>
            </section>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-medium text-gray-900">Your cart is empty</h2>
            <p className="mt-2 text-gray-500">Looks like you haven't added anything to your cart yet.</p>
            <div className="mt-6">
              <button onClick={() => setPage('products')} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-accent hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Start Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
