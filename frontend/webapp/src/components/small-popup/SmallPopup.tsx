import { FC, useEffect } from 'react';
import { Popup } from './styles';

type SmallPopupProps = {
  show: boolean;
  onTimeout: () => void;
};

export const SmallPopup: FC<SmallPopupProps> = ({ children, show, onTimeout }) => {
  useEffect(() => {
    if (show) {
      setTimeout(() => {
        onTimeout();
      }, 3000);
    }
  }, [show]);

  return (
    <Popup show={show}>
      <p>{children}</p>
    </Popup>
  );
};
