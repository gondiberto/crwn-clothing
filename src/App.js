import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navegation.component";
import Home from "./routes/home/home.component";
import Authentication from "./routes/authentication/authentication";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Shop from "./routes/shop/shop.component";

const Contact = () => {
  return (
    <div>
      <Link className="nav-link" to="/contact/email">
        Email Contact
      </Link>

      <h1>Contact Page</h1>
      <Outlet />
    </div>
  );
};

const ContactEmail = () => {
  return <h1>Contact Email Page</h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="contact" element={<Contact />}>
          <Route path="email" element={<ContactEmail />} />
        </Route>
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
