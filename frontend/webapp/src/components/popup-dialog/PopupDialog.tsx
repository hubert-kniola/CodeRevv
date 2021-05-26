import { FC } from 'react';
import ReactDOM from 'react-dom';

import { Backdrop, Overlay } from './style';

type PopupDialogProps = {
  //Tutaj jakieś potrzebne propsy
}

export const PopupDialog: FC<PopupDialogProps> = ({ children }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <>
          <Backdrop/>
          <Overlay>{children}</Overlay>
        </>,
        document.getElementById('messageOverlay') as HTMLElement
      )}
    </>
  );
};

