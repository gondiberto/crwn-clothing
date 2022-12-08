import "./cart-dropdown.styles.scss";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/cart.context";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

const CartDropdown = () => {
  const { cartItems, setIsCartOpen, cartCount } = useContext(CartContext);
  const navigate = useNavigate();

  // hidden when going to checkout page
  const goToCheckout = () => {
    // hook to navigate to a route
    navigate("/checkout");
    setIsCartOpen(false);
  };

  return (
    <div className="cart-dropdown-container">
      {cartItems.map((item) => (
        <CartItem key={item.id} cartItem={item} />
      ))}
      {!cartCount ? (
        <span>no items - go shopping!</span>
      ) : (
        <Button onClick={goToCheckout}>Checkout</Button>
      )}
    </div>
  );
};

export default CartDropdown;
