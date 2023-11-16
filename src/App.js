import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Links from "./components/links";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import AdminProducts from "./pages/AdminProducts";
import AdminProductDetails from "./pages/AdminProductDetails";
import ShoppingCart from './pages/ShoppingCart';
const helmetContext = {};

function App() {
  return (
    <HelmetProvider context={helmetContext}>
      <BrowserRouter>
        <Links />
        <Routes>
          <Route index element={<Home />} />
          <Route path="" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="shoppingcart" element={<ShoppingCart />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:productId" element={<ProductDetails />} />
          <Route path="admin/products" element={<AdminProducts />} />
          <Route path="admin/products/:productId" element={<AdminProductDetails />} />
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
