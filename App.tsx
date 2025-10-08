import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Header } from './components/Header';
import { ProductList } from './components/ProductList';
import { CartView } from './components/CartView';
import { PaymentView } from './components/PaymentView';
import { ConfirmationView } from './components/ConfirmationView';
import { PRODUCTS } from './constants';
import { Page, CartItem } from './types';
import { clearCart } from './store/cartSlice';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('products');
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<CartItem[]>([]);
  const dispatch = useDispatch();

  const handleSuccessfulPayment = (orderItems: CartItem[]) => {
    setConfirmedOrder(orderItems);
    dispatch(clearCart());
    setCurrentPage('confirmation');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'cart':
        return <CartView setPage={setCurrentPage} />;
      case 'payment':
        return <PaymentView setPage={setCurrentPage} onPaymentSuccess={handleSuccessfulPayment} />;
      case 'confirmation':
        return <ConfirmationView orderItems={confirmedOrder} setPage={setCurrentPage} />;
      case 'products':
      default:
        return <ProductList products={PRODUCTS} searchTerm={searchTerm} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header setPage={setCurrentPage} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main>
        {renderPage()}
      </main>
      <footer className="bg-white mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
            <div className="mt-8 md:mt-0 md:order-1">
                <p className="text-center text-base text-gray-400">&copy; 2024 SoleMates, Inc. All rights reserved.</p>
            </div>
        </div>
      </footer>
    </div>
  );
}

export default App;