import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./firebase/AuthContext";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apiServices/Apollo/ApolloClient.tsx";
import { GizDataProvider } from "./components/GizDataContext.tsx";
import { AnimatePresence } from "framer-motion";

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(new URL('/firebase-messaging-sw.js', import.meta.url), { type: 'module' })
    .then((registration) => {
      console.log('Service Worker registered: ', registration);
    })
    .catch((registrationError) => {
      console.log('Service Worker registration failed: ', registrationError);
    });
}

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
