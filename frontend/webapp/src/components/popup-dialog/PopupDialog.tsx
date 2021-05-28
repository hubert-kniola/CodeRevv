import { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Fade, Grow } from '@material-ui/core';

import { BackdropElement, Overlay, MainButton, MinorButton, Title, Body } from './style';
import { useTransState } from 'hooks';

type BackdropProps = {
  show: boolean;
};

export const Backdrop: FC<BackdropProps> = ({ show, children }) => {
  return (
    <Fade in={show}>
      <BackdropElement>{children}</BackdropElement>
    </Fade>
  );
};

type PopupDialogProps = {
  open: boolean;
};

export const PopupDialog: FC<PopupDialogProps> = ({ open, children }) => {
  const [ref, trans, trigger] = useTransState(open, true, false);

  useEffect(() => {
    trigger();
  }, [open]);

  return (
    <>
      {(ref.current || trans) &&
        ReactDOM.createPortal(
          <Backdrop show={trans}>
            <Grow in={trans} appear>
              <Overlay>{children}</Overlay>
            </Grow>
          </Backdrop>,

          document.getElementById('messageOverlay') as HTMLElement
        )}
    </>
  );
};

type ButtonProps = {
  primary?: boolean;
  onClick: () => void;
};

export const PopupDialogBtnGroup: FC = ({ children }) => (
  <div style={{ width: '100%', textAlign: 'center' }}>{children}</div>
);

export const PopupDialogButton: FC<ButtonProps> = ({ children, primary, onClick }) => {
  return primary ? (
    <MainButton onClick={onClick}>{children}</MainButton>
  ) : (
    <MinorButton onClick={onClick}>{children}</MinorButton>
  );
};

export const PopupDialogTitle: FC = ({ children }) => <Title>{children}</Title>;

export const PopupDialogBody: FC = ({ children }) => <Body>{children}</Body>;
