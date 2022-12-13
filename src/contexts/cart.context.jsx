import { createContext, useEffect, useState } from "react";

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

export const CartProvider = ({ children }) => {
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

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemToCart = (productToDecrease, forceDelete = false) => {
    setCartItems(removeCartItem(cartItems, productToDecrease, forceDelete));
  };

  // here we expose what we want to consume
  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    cartPrice,
    removeItemToCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
