import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Links from "./components/links";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";

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
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
