import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import "./checkout-cart.syles.scss";

const CheckoutCart = ({ cartItem }) => {
  // desconstruct
  const { imageUrl, name, price, quantity } = cartItem;
  const { removeItemToCart, addItemToCart } = useContext(CartContext);

  // good practise to remove the called functions from the JS tags
  const handleDecrease = () => removeItemToCart(cartItem);
  const handleClearItem = () => removeItemToCart(cartItem, true);
  const handleIncrease = () => addItemToCart(cartItem);

  return (
    <div className="checkout-item-container">
      <img className="image-container" src={imageUrl} alt={`${name}`} />
      <span className="name">{name}</span>
      <span className="quantity">
        <div onClick={handleDecrease} className="arrow">
          &#11164;
        </div>
        <span className="value">{quantity}</span>
        <div onClick={handleIncrease} className="arrow">
          &#11166;
        </div>
      </span>
      <span className="price">${price}</span>
      <div onClick={handleClearItem} className="remove-button">
        &#128465;
      </div>
    </div>
  );
};

export default CheckoutCart;
