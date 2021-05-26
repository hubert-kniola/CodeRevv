import { useState, useContext, createContext, FC } from 'react';
import { Container, Frame, Title, Item, Inner, Header, Body } from './styles';

import open from 'images/open.png';
import { Grid } from '@material-ui/core';

export const Accordion: FC = ({ children, ...restProps }) => (
  <Container>
    <Inner {...restProps}>{children}</Inner>
  </Container>
);

export const AccordionTitle: FC = ({ children, ...restProps }) => <Title {...restProps}>{children}</Title>;

export const AccordionFrame: FC = ({ children, ...restProps }) => <Frame {...restProps}>{children}</Frame>;

interface IToggleContext {
  show: boolean;
  setShow: (state: boolean) => void;
}

const ToggleContext = createContext({} as IToggleContext);

type ItemProps = {
  isOpen?: boolean;
};

export const AccordionItem: FC<ItemProps> = ({ children, isOpen, ...restProps }) => {
  const [show, setShow] = useState(isOpen != null ? !isOpen : true);

  return (
    <ToggleContext.Provider value={{ show, setShow }}>
      <Item {...restProps}>{children}</Item>
    </ToggleContext.Provider>
  );
};

export const AccordionHeader: FC = ({ children, ...restProps }) => {
  const { show, setShow } = useContext(ToggleContext);

  return (
    <Header show={show} onClick={() => setShow(!show)} {...restProps}>
      <Grid container>
        <Grid item xs={11}>
          {children}
        </Grid>
        <Grid style={{textAlign: 'right'}} item xs={1}>
          <img src={open} alt="Open" />
        </Grid>
      </Grid>
    </Header>
  );
};

export const AccordionBody: FC = ({ children, ...restProps }) => {
  const { show } = useContext(ToggleContext);

  return (
    <Body show={show} {...restProps}>
      <span>{children}</span>
    </Body>
  );
};
