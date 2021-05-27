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
  }, [ref.current, handler]);
};

export function useTransState<T>(
  state: T,
  transStart: boolean = false,
  autoReappear: boolean = true,
  timeout: number = 500
): [MutableRefObject<T>, boolean, () => void] {
  const [lastState, setLastState] = useState(state);
  const [trans, setTrans] = useState(transStart);
  const ref = useRef(state);

  ref.current = trans ? state : lastState;

  useEffect(() => {
    setTimeout(() => {
      setLastState((_: any) => state);
    }, timeout);
  }, [ref.current]);

  const trigger = () => {
    setTrans((t) => !t);

    if (autoReappear) {
      setTimeout(() => {
        setTrans((t) => !t);
      }, timeout);
    }
  };

  return [ref, trans, trigger];
}
