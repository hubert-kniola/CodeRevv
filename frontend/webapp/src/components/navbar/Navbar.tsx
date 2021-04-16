import { useState, useEffect, FunctionComponent } from 'react';

import { Container, Link, Menu, ButtonMenu, Button, Logo } from './styles';

export const Navbar: FunctionComponent = ({ children }) => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 80);

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <Container scroll={scroll}>{children}</Container>;
};

export const NavbarMenu: FunctionComponent = ({ children }) => <Menu>{children}</Menu>;

export const NavbarButtonMenu: FunctionComponent = ({ children }) => <ButtonMenu>{children}</ButtonMenu>;

type LinkProps = { to: string; active: boolean };

export const NavbarLogoLink: FunctionComponent<LinkProps> = ({ children, ...restProps }) => (
  <Link {...restProps}>
    <Logo />
  </Link>
);

export const NavbarItemLink: FunctionComponent<LinkProps> = ({ children, ...restProps }) => (
  <Link {...restProps}>{children}</Link>
);

export const NavbarButtonLink: FunctionComponent<LinkProps> = ({ children, ...restProps }) => (
  <Button {...restProps}>{children}</Button>
);
