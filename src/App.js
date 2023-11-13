import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Links from "./components/links";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
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
          <Route path="products" element={<Products />} />
          <Route path="products/:productId" element={<ProductDetails />} />
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;