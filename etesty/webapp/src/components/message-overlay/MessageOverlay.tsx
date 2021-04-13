import React, { forwardRef, ReactNode, RefObject } from 'react';

import { Overlay, Title, Body, Logo, DummyContainer, InnerContainer } from './styles';

type BaseProps = {
  children?: ReactNode;
  active: boolean;
  title?: string;
  text?: string;
  noLogo?: boolean;
};

export const scrollIntoMessageOverlay = (messageRef: RefObject<HTMLDivElement>) => {
  if (messageRef != null) {
    messageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export const MessageOverlay = forwardRef<HTMLDivElement, BaseProps>(
  ({ children, active, text, title, noLogo }, ref) => {
    const noChildren = () => React.Children.count(React.Children.toArray(children)) <= 0;

    return (
      <div ref={ref}>
        {noChildren() && active ? <DummyContainer /> : null}
        <Overlay
          text={
            text != null ? (
              <>
                <Body>{text}</Body>
                {!noLogo && <Logo />}
              </>
            ) : (
              <>{!noLogo && <Logo />}</>
            )
          }
          spinner={title != null && <Title>{title}</Title>}
          active={active}
        >
          {noChildren() && active ? <InnerContainer /> : children}
        </Overlay>
      </div>
    );
  }
);
