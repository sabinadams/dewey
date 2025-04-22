import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { store } from '@/store';
import { ClerkProvider } from '@clerk/clerk-react';
import App from "./App";
import "@/styles/index.css";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Show the root element when the app is ready
const root = document.getElementById("root");
if (root) {
  root.style.display = "block";
}

ReactDOM.createRoot(root as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ClerkProvider publishableKey={clerkPubKey}>
        <App />
      </ClerkProvider>
    </Provider>
  </React.StrictMode>,
);
