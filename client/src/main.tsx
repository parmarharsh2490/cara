import { createRoot } from "react-dom/client";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { QueryProvider } from "./query/QueryProvider.js";
import { UserProvider } from "./context/index.js";

const Toaster = React.lazy(() => import("./components/ui/toaster.js"));

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryProvider>
      <UserProvider>
        <App />
      </UserProvider>
      <Toaster />
    </QueryProvider>
  </BrowserRouter>
);
