import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./firebase/AuthContext";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apiServices/Apollo/ApolloClient.tsx";
import { AnimatePresence } from "framer-motion";
import { GizDataProvider } from "./components/GizDataContext.tsx";

// Register the service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../firebase-messaging-sw.js')
    .then(function() {
      // Add an event listener to handle messages from the service worker
      navigator.serviceWorker.addEventListener('message', function(event) {

        if (event.data.action === 'accept') {
          // Handle the accept action
          // Call the function that handles the accept mutation
        } else if (event.data.action === 'decline') {
          // Handle the decline action
          // Call the function that handles the decline mutation
        }
      });

    }).catch(function(err) {
      console.log('Service worker registration failed, error:', err);
    });
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <AnimatePresence mode="wait">
          <GizDataProvider status="invited">
            <App />
            </GizDataProvider>
          </AnimatePresence>
        </BrowserRouter>
      </ApolloProvider>
    </AuthProvider>
  </React.StrictMode>
);
