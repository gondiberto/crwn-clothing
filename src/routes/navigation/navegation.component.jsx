import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import {
  NavigationContainer,
  NavLinks,
  NavLink,
  LogoContainer,
} from "./navigation.styles";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      {/* frament allow us to not be obligate to put it inside a div */}
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          <NavLink to="/contact">CONTACT</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
      </NavigationContainer>
      {isCartOpen && <CartDropdown />}

      {/* define the position that the children routes will be rendered */}
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
