import Message from "./Components/Message";
import styled from "styled-components";

import logo from "./logo.svg";

const App = () => {
  return (
    <AppDiv>
      <header>
        <LogoImg src={logo} alt="logo" />
      </header>

      <Message />
    </AppDiv>
  );
};

export default App;

const AppDiv = styled.div`
  text-align: center;
`;

const LogoImg = styled.img`
  height: 20vmin;
  pointer-events: none;

  @media (prefers-reduced-motion: no-preference) {
    animation: App-logo-spin infinite 20s linear;
  }

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;