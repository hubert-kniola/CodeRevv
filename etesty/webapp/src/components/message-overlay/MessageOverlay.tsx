import { FunctionComponent } from 'react';

import { Overlay, Title, Body, Logo } from './styles';

type Props = {
  active: boolean;
  title?: string;
  text: string;
};

export const MessageOverlay: FunctionComponent<Props> = ({ children, active, text, title }) => (
  <Overlay
    text={
      <>
        <Body>{text}</Body>
        <Logo />
      </>
    }
    spinner={title != null && <Title>{title}</Title>}
    active={active}
  >
    {children}
  </Overlay>
);
