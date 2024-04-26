import React, { useState, useEffect } from 'react';
import HomePage from './page/home/HomePage';
import UserLayout from './layout/user/UserLayout';
import ProductDetailPage from './page/product/ProductDetailPage';
import ShopePage from './page/product/ShopePage';
import CartPage from './page/cart/CartPage';
import CheckoutPage from './page/cart/CheckoutPage';
import OrderPage from './page/cart/OrderPage';
import AdminLayout from './layout/admin/AdminLayout';
import ProductListPage from './page/admin/products/ProductListPage';
import AddProductPage from './page/admin/products/AddProductPage';
import OrderListPage from './page/admin/orders/OrderListPage';
import OrderDetailPage from './page/admin/orders/OrderDetailPage';
import ProfilePage from './page/profile/ProfilePage';
import LayoutProfile from './page/profile/layout/LayoutProfile';
import HistoryOrderPage from './page/profile/HistoryOrderPage';
import DashboardPage from './page/profile/DashboardPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProductProvider } from './services/helpers/getDataHelpers';
import { CartProvider } from './services/helpers/getDataCartHelper';
import UserListPage from './page/admin/user/UserListPage';
import UserPage from './page/admin/user/UserPage';

function App() {
  // const { roles } = useCartContext() || {};
  // console.log("role", roles)
  const rolesString = sessionStorage.getItem("roles");
  const isAdmin = rolesString && rolesString.includes("Admin");

  return (
    <>
      <Router>
        <ProductProvider>
          <CartProvider>
            <Routes>
              {isAdmin ? (
                <Route path="/" element={<AdminLayout />}>
                  <Route index element={<ProductListPage />} />
                  <Route path="/AddProduct" element={<AddProductPage />} />
                  <Route path="/EdirProduct/:id" element={<AddProductPage />} />
                  <Route path="/User" element={<UserPage />} />
                  <Route path="/UserList" element={<UserListPage />} />
                  <Route path="/OrderList" element={<OrderListPage />} />
                  <Route path="/OrderList/:id" element={<OrderDetailPage />} />
                </Route>
              ) : (
                <Route path="/" element={<UserLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path='/Detail/:id' element={<ProductDetailPage />} />
                  <Route path='/cart' element={<CartPage />} />
                  <Route path='/shop/:id' element={<ShopePage />} />
                  <Route path='/checkout' element={<CheckoutPage />} />
                  <Route path='/orderSuccess' element={<OrderPage />} />
                  <Route path='/profile' element={<ProfilePage />} />
                  <Route path='/dashboard' element={<LayoutProfile />} >
                    <Route path='/dashboard' element={<DashboardPage />} />
                    <Route path='/dashboard/profile' element={<ProfilePage />} />
                    <Route path='/dashboard/historyOrder' element={<HistoryOrderPage />} />
                  </Route >
                </Route>
              )}
            </Routes>
          </CartProvider>
        </ProductProvider>
      </Router>
    </>
  )
}

export default App;
