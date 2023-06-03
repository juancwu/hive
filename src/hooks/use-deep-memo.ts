import { useRef } from 'react';

export type DeepMemoValidator<T> = (current: T, previous: T) => boolean;

export default function useDeepMemo<T>(memo: T, validator: DeepMemoValidator<T>) {
  const memoRef = useRef<T>(memo);

  if (!validator(memo, memoRef.current)) {
    memoRef.current = memo;
  }

  return memoRef.current;
}
