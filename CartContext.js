import React, { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
  cartItems: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case "INCREMENT_CART_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case "DECREMENT_CART_ITEM":
      const itemToDecrement = state.cartItems.find(
        (item) => item.id === action.payload
      );

      if (itemToDecrement.quantity === 1) {
        return {
          ...state,
          cartItems: state.cartItems.filter(
            (item) => item.id !== action.payload
          ),
        };
      } else {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      }
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
