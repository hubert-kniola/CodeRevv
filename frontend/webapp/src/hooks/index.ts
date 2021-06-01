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
  const [refTimeout, setRefTimeout] = useState<NodeJS.Timeout | null>(null);
  const [reappearTimeout, setReappearTimeout] = useState<NodeJS.Timeout | null>(null);

  ref.current = trans ? state : lastState;

  useEffect(() => {
    if (refTimeout === null) {
      setRefTimeout(
        setTimeout(() => {
          setLastState((_: any) => state);
          setRefTimeout(null);
        }, timeout)
      );
    }
  }, [ref.current]);

  const trigger = () => {
    if (reappearTimeout === null) {
      setTrans((t) => !t);

      if (autoReappear) {
        setReappearTimeout(
          setTimeout(() => {
            setTrans((t) => !t);
            setReappearTimeout(null);
          }, timeout)
        );
      }
    }
  };

  return [ref, trans, trigger];
}
