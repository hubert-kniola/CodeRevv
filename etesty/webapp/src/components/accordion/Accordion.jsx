import { useState, useContext, createContext } from 'react';
import { Container, Frame, Title, Item, Inner, Header, Body } from './styles';

import open from '../../images/open.png';

const ToggleContext = createContext();

const Accordion = ({ children, ...restProps }) => (
  <Container {...restProps}>
    <Inner>{children}</Inner>
  </Container>
);

export default Accordion;

Accordion.Title = ({ children, ...restProps }) => <Title {...restProps}>{children}</Title>;

Accordion.Frame = ({ children, ...restProps }) => <Frame {...restProps}>{children}</Frame>;

Accordion.Item = function AccordionItem({ children, ...restProps }) {
  const [toggleShow, setToggleShow] = useState(true);

  return (
    <ToggleContext.Provider value={{ toggleShow, setToggleShow }}>

      <Item {...restProps}>{children}</Item>
      
    </ToggleContext.Provider>
  );
};

Accordion.Header = function AccordionHeader({ children, ...restProps }) {
  const { toggleShow, setToggleShow } = useContext(ToggleContext);

  return (
    <Header toggleShow={toggleShow} onClick={() => setToggleShow(!toggleShow)} {...restProps}>
      {children}
      <img src={open} alt="Open" />
    </Header>
  );
};

Accordion.Body = function AccordionBody({ children, ...restProps }) {
  const { toggleShow } = useContext(ToggleContext);

  return (
    <Body toggleShow={toggleShow} {...restProps}>
      <span>{children}</span>
    </Body>
  );
};
