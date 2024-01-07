import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./firebase/AuthContext";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apiServices/Apollo/ApolloClient.tsx";
import { AnimatePresence } from "framer-motion";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <App />
          </AnimatePresence>
        </BrowserRouter>
      </ApolloProvider>
    </AuthProvider>
  </React.StrictMode>
);
