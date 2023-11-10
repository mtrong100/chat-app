import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/auth-context.jsx";
import { ChatProvider } from "./context/chat-context.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <AuthProvider>
        <ChatProvider>
          <App />
          <Toaster richColors position="top-center" duration={2000} />
        </ChatProvider>
      </AuthProvider>
    </Provider>
  </BrowserRouter>
);
