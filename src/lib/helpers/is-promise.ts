export type MaybePromise<T> = T | Promise<T>;

export default function isPromise<T>(fn: MaybePromise<T>) {
  return !!fn && (typeof fn === 'object' || typeof fn === 'function') && 'then' in fn;
}
