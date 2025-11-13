import React from 'react';
import { Routes, Route } from 'react-router-dom';


import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import { CartProvider } from './context/CartContext';

import AdminLoginPage from './pages/AdminLoginPage';  
import { AdminLayout } from './admin/AdminLayout';
import { AdminProtectedRoute } from './admin/AdminProtectedRoute';
import { AdminDashboardPage } from './admin/pages/AdminDashboardPage';
import { AdminProductListPage } from './admin/pages/AdminProductListPage';
import { AdminProductEditPage } from './admin/pages/AdminProductEditPage';

function App() {

console.log({
    AdminLoginPage,
    AdminLayout,
    AdminProtectedRoute,
    AdminDashboardPage,
    AdminProductListPage,
    AdminProductEditPage,
  });







  return (
    <Routes>
      {/*  */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="product/:id" element={<ProductDetailPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="my-orders" element={<OrderHistoryPage />} />

      </Route>

      {/*  */}
      <Route path="/admin" element={<AdminProtectedRoute />}>
  <Route element={<AdminLayout />}>
    <Route path="dashboard" element={<AdminDashboardPage />} />
    <Route path="products" element={<AdminProductListPage />} />
    <Route path="products/new" element={<AdminProductEditPage />} />
    <Route path="products/edit/:id" element={<AdminProductEditPage />} />
  </Route>
</Route>


    </Routes>
  );
}

export default App;
