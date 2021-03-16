import { LogoImg } from "./styles";

import logo from "./logo.svg";

const Logo = () => {
  return (
    <header>
      <LogoImg src={logo} alt="logo" />
    </header>
  );
};

export default Logo;