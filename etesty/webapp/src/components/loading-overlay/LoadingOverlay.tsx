import { FunctionComponent } from 'react';

import { Overlay } from './styles';
import { Logo } from 'components/message-overlay/styles';

type Props = {
  active: boolean;
  text: string;
  logo?: boolean;
};

export const LoadingOverlay: FunctionComponent<Props> = ({ children, active, text, logo }) => (
  <Overlay
    text={
      logo ? (
        <>
          {text}
          <br />
          <Logo />
        </>
      ) : (
        <> {text}</>
      )
    }
    spinner
    active={active}
  >
    {children}
  </Overlay>
);
