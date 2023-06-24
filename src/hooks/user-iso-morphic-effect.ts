/* eslint-disable react-hooks/rules-of-hooks */
import { DependencyList, EffectCallback, useEffect, useLayoutEffect } from 'react';

export function useIsoMorphicEffect(cb: EffectCallback, deps?: DependencyList) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    useEffect(cb, deps);
  } else {
    useLayoutEffect(cb, deps);
  }
}
