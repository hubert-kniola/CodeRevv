import { FC, useRef } from 'react';
import { Backdrop } from 'components';
import { Panel, HeaderContainer } from './style';
import { useOnClickOutside } from 'hooks';

import CloseIcon from '@material-ui/icons/Close';

type sliderProps = {
  show: boolean;
  title: string;
  close: () => void;
};

export const SlidingPanel: FC<sliderProps> = ({ show, title, close, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, close);

  return (
    <>
      <Backdrop show={show} />
      <Panel ref={ref} show={show}>
        <HeaderContainer>
          <label>
            <CloseIcon onClick={() => close()} className="ico" />
          </label>
          <p>{title}</p>
        </HeaderContainer>
        <hr />
        {children}
      </Panel>
    </>
  );
};
