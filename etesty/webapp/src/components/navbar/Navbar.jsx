import { connect } from "react-redux";
import { Nav, NavLink, NavMenu, NavBtn, NavBtnLink, Logo } from "./styles";

import logo from "../../images/logo.png";

const Navbar = () => {
  return (
    <Nav>
      <NavLink to="/">
        <Logo src={logo} alt="logo" />
      </NavLink>
      <NavMenu>
        <NavLink to="/services">Oferta</NavLink>
        <NavLink to="/contact">Kontakt</NavLink>
        <NavLink to="/blog">Blog</NavLink>
        <NavLink to="/signup" active>Zarejestruj się</NavLink>
      </NavMenu>
      <NavBtn>
        <NavBtnLink to="/login">Zaloguj się</NavBtnLink>
      </NavBtn>
    </Nav>
  );
};

export default Navbar;
