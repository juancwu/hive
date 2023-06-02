import { useRef } from 'react';

export default function useDebounce<T extends unknown[], R = void>(
  func: (...args: T) => R,
  delay: number
): [(...args: T) => Promise<R>, () => void] {
  const timerRef = useRef<number | undefined>(undefined);

  const teardown = () => {
    window.clearTimeout(timerRef.current);
    timerRef.current = undefined;
  };

  const debouncedFunc = (...args: T): Promise<R> => {
    teardown();
    return new Promise((resolve, reject) => {
      timerRef.current = window.setTimeout(async () => {
        try {
          const result = await func(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  };

  return [debouncedFunc, teardown];
}
