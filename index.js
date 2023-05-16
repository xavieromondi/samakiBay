import { registerRootComponent } from "expo";
import React from "react";
import { CartProvider } from "./CartContext"; // Import your CartProvider component
import App from "./App";

const Main = () => {
  return (
    <CartProvider>
      <App />
    </CartProvider>
  );
};

registerRootComponent(Main);
