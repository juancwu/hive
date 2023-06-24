import { useCallback } from 'react';
import { useLatestValue } from './use-latest-value';

export function useEvent<
  F extends (...args: any[]) => any,
  P extends any[] = Parameters<F>,
  R = ReturnType<F>
>(cb: (...args: P) => R) {
  const cache = useLatestValue(cb);
  const _cb = useCallback((...args: P) => cache.current(...args), [cache]);
  return _cb;
}
