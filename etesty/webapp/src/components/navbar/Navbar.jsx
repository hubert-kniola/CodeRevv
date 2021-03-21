import { useState, useEffect } from 'react';
import { Container, Link, Menu, ButtonMenu, Button, Logo } from './styles';

import logo from 'images/logo.png';

const Navbar = ({ children, ...restProps }) => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <Container scroll={scroll} {...restProps}>
      {children}
    </Container>
  );
};

export default Navbar;

Navbar.LogoLink = ({ children, ...restProps }) => (
  <Link {...restProps}>
    <Logo src={logo} />
  </Link>
);

Navbar.Menu = ({ children, ...restProps }) => <Menu {...restProps}>{children}</Menu>;

Navbar.ItemLink = ({ children, ...restProps }) => <Link {...restProps}>{children}</Link>;

Navbar.ButtonMenu = ({ children, ...restProps }) => <ButtonMenu {...restProps}>{children}</ButtonMenu>;

Navbar.ButtonLink = ({ children, ...restProps }) => <Button {...restProps}>{children}</Button>;
