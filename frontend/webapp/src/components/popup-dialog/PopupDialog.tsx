import { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Fade, Grow } from '@material-ui/core';

import { Backdrop, Overlay, MainButton, MinorButton, Title, Body } from './style';
import { useTransState } from 'hooks';

type PopupDialogProps = {
  open: boolean;
  title: string;
  body: string;
};

export const PopupDialog: FC<PopupDialogProps> = ({ open, title, body, children }) => {
  const [ref, trans, trigger] = useTransState(open, false, false);

  useEffect(() => {
    trigger();
  }, [open]);

  return (
    <>
      {(ref.current || trans) &&
        ReactDOM.createPortal(
          <Fade in={trans}>
            <Backdrop>
              <Grow in={trans} appear>
                <Overlay>
                  <Title>{title}</Title>

                  <hr />

                  <Body>{body}</Body>

                  <div style={{ width: '100%', textAlign: 'center' }}>{children}</div>
                </Overlay>
              </Grow>
            </Backdrop>
          </Fade>,
          document.getElementById('messageOverlay') as HTMLElement
        )}
    </>
  );
};

type ButtonProps = {
  primary?: boolean;
  onClick: () => void;
};

export const PopupDialogButton: FC<ButtonProps> = ({ children, primary, onClick }) => {
  return primary ? (
    <MainButton onClick={onClick}>{children}</MainButton>
  ) : (
    <MinorButton onClick={onClick}>{children}</MinorButton>
  );
};
