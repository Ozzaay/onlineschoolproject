import { createBrowserRouter } from "react-router-dom";
import React from "react";


import App from "./App";
import Page1 from "./pages/page1";
import Page2 from "./pages/page2";

const router = createBrowserRouter ([
    {path: "/", element: <App />},
    {path: "/page1", element: <Page1 />},
    {path: "/page2", element: <Page2 />},
]);

export default router;