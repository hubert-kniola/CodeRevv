import { useState, useContext, createContext, FunctionComponent } from 'react';
import { Container, Frame, Title, Item, Inner, Header, Body } from './styles';

import open from 'images/open.png';

export const Accordion: FunctionComponent = ({ children, ...restProps }) => (
  <Container>
    <Inner {...restProps}>{children}</Inner>
  </Container>
);

export const AccordionTitle: FunctionComponent = ({ children, ...restProps }) => (
  <Title {...restProps}>{children}</Title>
);

export const AccordionFrame: FunctionComponent = ({ children, ...restProps }) => (
  <Frame {...restProps}>{children}</Frame>
);

interface IToggleContext {
  show: boolean;
  setShow: (state: boolean) => void;
}

const ToggleContext = createContext({} as IToggleContext);

export const AccordionItem: FunctionComponent = ({ children, ...restProps }) => {
  const [show, setShow] = useState(true);

  return (
    <ToggleContext.Provider value={{ show, setShow }}>
      <Item {...restProps}>{children}</Item>
    </ToggleContext.Provider>
  );
};

export const AccordionHeader: FunctionComponent = ({ children, ...restProps }) => {
  const { show, setShow } = useContext(ToggleContext);

  return (
    <Header show={show} onClick={() => setShow(!show)} {...restProps}>
      {children}
      <img src={open} alt="Open" />
    </Header>
  );
};

export const AccordionBody: FunctionComponent = ({ children, ...restProps }) => {
  const { show } = useContext(ToggleContext);

  return (
    <Body show={show} {...restProps}>
      <span>{children}</span>
    </Body>
  );
};
