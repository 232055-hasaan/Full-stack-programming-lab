import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import TopBar from './components/TopBar';
import Header from './components/Header';
import SecondaryNav from './components/SecondaryNav';
import BrandsBar from './components/BrandsBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import MyAccount from './pages/MyAccount';
import EditAccount from './pages/EditAccount';
import EditBillingAddress from './pages/EditBillingAddress';
import EditShippingAddress from './pages/EditShippingAddress';
import Checkout from './pages/Checkout';
import OrderSummary from './pages/OrderSummary';
import OrderDetails from './pages/OrderDetails';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

function Layout({ children, showSecondaryNav }) {
  return (
    <>
      <TopBar />
      <Header />
      {showSecondaryNav && <SecondaryNav />}
      {children}
      <BrandsBar />
      <Footer />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout showSecondaryNav={true}><Home /></Layout>} />
          <Route path="/products" element={<Layout><Products /></Layout>} />
          <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>} />
          <Route path="/cart" element={<Layout><Cart /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/register" element={<Layout><Register /></Layout>} />
          <Route path="/forgot-password" element={<Layout><ForgotPassword /></Layout>} />
          <Route path="/my-account" element={<Layout><MyAccount /></Layout>} />
          <Route path="/edit-account" element={<Layout><EditAccount /></Layout>} />
          <Route path="/edit-billing" element={<Layout><EditBillingAddress /></Layout>} />
          <Route path="/edit-shipping" element={<Layout><EditShippingAddress /></Layout>} />
          <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
          <Route path="/order-summary" element={<Layout><OrderSummary /></Layout>} />
          <Route path="/order-details" element={<Layout><OrderDetails /></Layout>} />
          <Route path="/order-history" element={<Layout><OrderDetails /></Layout>} />
          <Route path="/about" element={<Layout><AboutUs /></Layout>} />
          <Route path="/contact" element={<Layout><ContactUs /></Layout>} />
          <Route path="/terms" element={<Layout><Terms /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
