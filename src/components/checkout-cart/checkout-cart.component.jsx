import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import "./checkout-cart.syles.scss";

const CheckoutCart = ({ cartItem }) => {
  // desconstruct
  const { imageUrl, name, price, quantity } = cartItem;
  const { removeItemToCart, addItemToCart } = useContext(CartContext);

  const handleDecrease = () => {
    removeItemToCart(cartItem);
  };
  return (
    <div className="checkout-item-container">
      <img className="image-container" src={imageUrl} alt={`${name}`} />
      <span className="name">{name}</span>
      <span onClick={handleDecrease}>decrease</span>
      <span className="quantity">{quantity}</span>
      <span onClick={() => addItemToCart(cartItem)}>increase</span>
      <span className="price">{price}</span>
      <div
        onClick={() => removeItemToCart(cartItem, true)}
        className="remove-button"
      >
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutCart;
