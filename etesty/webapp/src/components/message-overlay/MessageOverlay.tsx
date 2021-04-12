import React from 'react';
import { FunctionComponent } from 'react';

import { Overlay, Title, Body, Logo, DummyContainer } from './styles';

type Props = {
  active: boolean;
  title?: string;
  text?: string;
  empty?: boolean;
};

export const MessageOverlay: FunctionComponent<Props> = ({ children, active, text, title, empty }) => {
  const hasChildren = () => React.Children.count(React.Children.toArray(children)) > 0;

  return (
    <>
      {hasChildren() ? null : <DummyContainer />}
      <Overlay
        text={
          text != null ? (
            <>
              <Body>{text}</Body>
              <Logo />
            </>
          ) : (
            <Logo />
          )
        }
        spinner={title != null && <Title>{title}</Title>}
        active={active}
      >
        {hasChildren() ? children : <DummyContainer />}
      </Overlay>
    </>
  );
};
