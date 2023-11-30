import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Links from "./components/links";
import Home from "./pages/Home";
import Login from "./pages/User Info/Login";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/Products/ProductDetails";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminProductDetails from "./pages/Admin/AdminProductDetails";
import ShoppingCart from './pages/User Info/ShoppingCart';
import AddProduct from './pages/Admin/AddProduct';
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
          <Route path="admin/addproduct" element={<AddProduct />} />
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
