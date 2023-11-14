import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Links from "./components/links";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import AdminProducts from "./pages/AdminProducts";
import AdminProductDetails from "./pages/AdminProductDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Links />
        <Routes>
          <Route index element={<Home />} />
          <Route path="" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:productId" element={<ProductDetails />} />
          <Route path="admin/products" element={<AdminProducts />} />
          <Route path="admin/products/:productId" element={<AdminProductDetails />} />
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
