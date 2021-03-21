import { Navbar } from 'components';

const HomeNav = () => (
  <Navbar>
    <Navbar.LogoLink to="/" />
    <Navbar.Menu>
      <Navbar.ItemLink to="/contact">Kontakt</Navbar.ItemLink>
      <Navbar.ItemLink to="/signup" active="true">
        Zarejestruj się
      </Navbar.ItemLink>
    </Navbar.Menu>

    <Navbar.ButtonMenu>
      <Navbar.ButtonLink to="/signin">Zaloguj się</Navbar.ButtonLink>
    </Navbar.ButtonMenu>
  </Navbar>
);

export default HomeNav;
