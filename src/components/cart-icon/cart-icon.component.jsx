import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

// shortcut for creating functional component -> rsc + tab
const CartIcon = () => {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);

  const toogleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    <div className="cart-icon-container" onClick={toogleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count"></span>
    </div>
  );
};

export default CartIcon;
