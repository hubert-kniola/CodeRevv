import { FunctionComponent } from 'react';

import {
  Navbar,
  NavbarButtonLink,
  NavbarButtonMenu,
  NavbarItemLink,
  NavbarLogoLink,
  NavbarMenu,
  ThemeSwitch,
} from 'components';

export const HomeNav: FunctionComponent = () => (
  <Navbar>
    <NavbarLogoLink to="/" active={false} />
    <NavbarMenu>
      <NavbarItemLink to="/contact" active={false}>
        Kontakt
      </NavbarItemLink>
      <NavbarItemLink to="/signup" active={true}>
        Zarejestruj się
      </NavbarItemLink>
    </NavbarMenu>

    <NavbarButtonMenu>
      <ThemeSwitch />
      <NavbarButtonLink to="/signin" active={false}>
        Zaloguj się
      </NavbarButtonLink>
    </NavbarButtonMenu>
  </Navbar>
);
