import { useContext } from "react";
import CheckoutCart from "../../components/checkout-cart/checkout-cart.component";
import { CartContext } from "../../contexts/cart.context";
import "./checkout.styles.scss";

const Checkout = () => {
  // get cart list from context
  const { cartItems, cartPrice } = useContext(CartContext);
  console.log(cartItems);
  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutCart key={cartItem.id} cartItem={cartItem} />
      ))}

      <span className="total">Total: ${cartPrice}</span>
    </div>
  );
};

export default Checkout;
