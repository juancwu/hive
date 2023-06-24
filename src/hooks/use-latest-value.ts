import { useRef } from 'react';
import { useIsoMorphicEffect } from '@/hooks/user-iso-morphic-effect';

export function useLatestValue<T>(value: T) {
  const cache = useRef(value);

  useIsoMorphicEffect(() => {
    cache.current = value;
  }, [value]);

  return cache;
}
