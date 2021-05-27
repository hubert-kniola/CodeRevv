import { FunctionComponent } from 'react';

import {
  Navbar,
  NavbarButtonLink,
  NavbarButtonMenu,
  NavbarItemLink,
  NavbarLogoLink,
  ThemeSwitch,
} from 'components';

export const HomeNav: FunctionComponent = () => (
  <Navbar>
    <NavbarLogoLink to="/" active={false} />

    <NavbarItemLink to="/signup" active={true}>
      Zarejestruj się
    </NavbarItemLink>

    <NavbarButtonMenu>
      <ThemeSwitch />
      <NavbarButtonLink to="/signin" active={false}>
        Zaloguj się
      </NavbarButtonLink>
    </NavbarButtonMenu>
  </Navbar>
);
