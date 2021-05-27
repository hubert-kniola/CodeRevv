import { MutableRefObject, RefObject, useEffect, useRef, useState } from 'react';

export const useOnClickOutside = (ref: RefObject<HTMLDivElement>, handler: () => void) => {
  useEffect(() => {
    const listener = (event: Event) => {
      if (!ref.current || ref.current?.contains(event.target as Node)) {
        return;
      }

      handler();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export function useTransState<T>(state: T, timeout: number = 500): [MutableRefObject<T>, boolean, () => void] {
  const [lastState, setLastState] = useState(state);
  const [trans, setTrans] = useState(true);
  const ref = useRef(state);

  if (!trans) {
    ref.current = lastState;
  } else {
    ref.current = state;
  }

  useEffect(() => {
    setTimeout(() => {
      setLastState((_: any) => state);
    }, timeout);
  }, [ref.current]);

  const trigger = () => {
    setTrans(false);

    setTimeout(() => {
      setTrans(true);
    }, timeout);
  };

  return [ref, trans, trigger];
}
