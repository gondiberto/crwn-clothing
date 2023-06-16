import { initializeFirestore } from "firebase/firestore";
import { createContext, useEffect, useState, useReducer } from "react";

const addCartItem = (cartItems, productToAdd) => {
  // check if the product is already at the cart
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  // if exists, increment the quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // return a new array with the cartItems + the added product with an addicional field
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove, forceDelete = false) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // remove the item using filter
  if (existingCartItem.quantity === 1 || forceDelete) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // reduce the matched item
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeItemToCart: () => {},
  cartPrice: 0,
});

const INITIAL_STATE = {
  isCartOpen: true,
  cartItems: [],
  cartCount: 0,
  cartPrice: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  console.log(payload);
  switch (type) {
    case "SET_CART_ITEMS":
      return {
        ...state,
        payload,
      };

    default:
      throw new Error(`unhandled type ${type} in CartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  /*
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartPrice, setCartPrice] = useState(0);

  // Good pratice: dont use the same hook for different porpouses
  // hook to monitor cartItems and update the cart quantity
  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    setCartCount(newCartCount);
  }, [cartItems]);

  // monitor the cartItems and update the total
  useEffect(() => {
    const newCartPrice = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    setCartPrice(newCartPrice);
  }, [cartItems]);
  */

  const [{ cartItems, isCartOpen, cartCount, cartPrice }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    const newCartPrice = newCartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    dispatch({
      type: "SET_CART_ITEMS",
      payload: {
        cartItems: newCartItems,
        cartPrice: newCartPrice,
        cartCount: newCartCount,
      },
    });
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemToCart = (productToDecrease, forceDelete = false) => {
    const newCartItems = removeCartItem(
      cartItems,
      productToDecrease,
      forceDelete
    );
    updateCartItemsReducer(newCartItems);
  };

  // here we expose what we want to consume
  const value = {
    isCartOpen,
    setIsCartOpen: () => {},
    addItemToCart,
    cartItems,
    cartCount,
    cartPrice,
    removeItemToCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
