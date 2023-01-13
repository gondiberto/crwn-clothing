import "./cart-item.styles.scss";
import { CartContext } from "../../contexts/cart.context";
import { useContext } from "react";

// functional component
const CartItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const { removeItemToCart } = useContext(CartContext);

  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="item-details">
        <span className="name>">{name}</span>
        <span className="price">
          {quantity} x ${price}
        </span>
        <span
          className="remove"
          onClick={() => removeItemToCart(cartItem, true)}
        >
          &#128465;
        </span>
      </div>
    </div>
  );
};

export default CartItem;
