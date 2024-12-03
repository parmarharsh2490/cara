import { createRoot } from "react-dom/client";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { QueryProvider } from "./query/QueryProvider.js";
import { UserProvider } from "./context/index.js";
import { Analytics } from "@vercel/analytics/react"
import { HelmetProvider } from "react-helmet-async";
const Toaster = React.lazy(() => import("./components/ui/toaster.js"));

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
  <BrowserRouter>
    <QueryProvider>
      <UserProvider>
        <App />
        <Analytics />
      </UserProvider>
      <Toaster />
    </QueryProvider>
  </BrowserRouter>
  </HelmetProvider>
);
