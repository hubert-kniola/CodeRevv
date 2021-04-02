import { FunctionComponent } from 'react';

import { Overlay } from './styles';

type Props = {
  active: boolean;
  text: string;
};

export const LoadingOverlay: FunctionComponent<Props> = ({ children, active, text }) => (
  <Overlay text={text} spinner active={active}>
    {children}
  </Overlay>
);
