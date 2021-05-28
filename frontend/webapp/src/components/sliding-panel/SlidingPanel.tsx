import { FC, useRef } from 'react';
import { Backdrop } from 'components';
import { Panel } from './style';
import { useOnClickOutside } from '../../hooks/index';

import CloseIcon from '@material-ui/icons/Close';

type sliderProps = {
  show: boolean;
  close: () => void;
};

export const SlidingPanel: FC<sliderProps> = ({ show, close, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside( ref, close);

  return (
    <>
      <Backdrop show={show}/>
      <Panel ref={ref} show={show}>
        <CloseIcon onClick={() => close()} className="ico" />
        {children}
      </Panel>
    </>
  );
};
