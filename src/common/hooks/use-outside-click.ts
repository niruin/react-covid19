import {useEffect, useRef, useCallback} from 'react';

export function useOutsideClick<T extends HTMLElement>(callback: EventListener) {
  const container = useRef<T>(null);

  const handleEvent = useCallback(
    (e: Event) => {
      if (container.current && e.target !== null) {
        if (!container.current.contains(e.target as Node)) {
          callback(e);
        }
      }
    },
    [container, callback],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleEvent, true);
    document.addEventListener('touchstart', handleEvent, true);
    return () => {
      document.removeEventListener('mousedown', handleEvent, true);
      document.removeEventListener('touchstart', handleEvent, true);
    };
  }, [handleEvent]);

  return container;
}
