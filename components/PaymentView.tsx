import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Page, CartItem } from '../types';

interface PaymentViewProps {
  setPage: (page: Page) => void;
  onPaymentSuccess: (items: CartItem[]) => void;
}

export const PaymentView: React.FC<PaymentViewProps> = ({ setPage, onPaymentSuccess }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [cardDetails, setCardDetails] = useState({
      number: '',
      name: '',
      expiry: '',
      cvv: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
        alert('Please fill in all card details.');
        return;
    }
    console.log('Processing payment for:', cardDetails);
    alert('Payment successful!');
    onPaymentSuccess(cartItems);
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Checkout</h1>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
          <section className="lg:col-span-7">
            <div className="bg-white shadow sm:rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900">Payment Details</h2>
              <form onSubmit={handlePayment} className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div className="sm:col-span-2">
                  <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">Card number</label>
                  <div className="mt-1">
                    <input type="text" id="card-number" name="number" value={cardDetails.number} onChange={handleInputChange} autoComplete="cc-number" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="0000 0000 0000 0000" />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="card-name" className="block text-sm font-medium text-gray-700">Name on card</label>
                  <div className="mt-1">
                    <input type="text" id="card-name" name="name" value={cardDetails.name} onChange={handleInputChange} autoComplete="cc-name" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                  </div>
                </div>

                <div>
                  <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700">Expiration date (MM/YY)</label>
                  <div className="mt-1">
                    <input type="text" name="expiry" id="expiry-date" value={cardDetails.expiry} onChange={handleInputChange} autoComplete="cc-exp" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="MM/YY" />
                  </div>
                </div>

                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                  <div className="mt-1">
                    <input type="text" name="cvv" id="cvv" value={cardDetails.cvv} onChange={handleInputChange} autoComplete="csc" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="123" />
                  </div>
                </div>

                <div className="sm:col-span-2 pt-4">
                  <button type="submit" className="w-full bg-brand-accent border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500">
                    Pay ${total.toFixed(2)}
                  </button>
                </div>
              </form>
            </div>
          </section>

          <section aria-labelledby="summary-heading" className="mt-10 lg:mt-0 lg:col-span-5">
            <div className="bg-white shadow sm:rounded-lg p-6">
              <h2 id="summary-heading" className="text-lg font-medium text-gray-900">Order Summary</h2>
              <ul role="list" className="mt-6 divide-y divide-gray-200">
                {cartItems.map(item => (
                  <li key={item.id} className="flex py-4">
                    <img src={item.image} alt={item.name} className="h-20 w-20 flex-none rounded-md object-cover object-center" />
                    <div className="ml-4 flex flex-auto flex-col">
                      <div>
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <div className="flex flex-1 items-end">
                        <p className="mt-auto text-lg font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="mt-6 space-y-4 border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between text-base font-medium text-gray-900">
                  <dt>Total</dt>
                  <dd>${total.toFixed(2)}</dd>
                </div>
              </dl>
              <div className="mt-6">
                <button onClick={() => setPage('cart')} className="w-full text-sm font-medium text-brand-accent hover:text-blue-500">
                  &larr; Back to Cart
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};