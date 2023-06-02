import { useLayoutEffect, useEffect, useRef } from 'react';
import type { RefType, Keybind, KeybindCallback, UseKeybindOptions } from './types';
import { isMatchingKeybind, isTriggeredInInputNode } from './validators';
import { parseKeybind } from './parser';
import { normalize } from 'path';

const useSafeLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// global key pressed tracker
const keysPressed = new Set<string>();

const defaultOptions: UseKeybindOptions = {
  triggerInInput: false,
};

export default function useKeybind<T extends HTMLElement>(
  keybind: string[],
  callback: KeybindCallback,
  options?: UseKeybindOptions
) {
  const nodeRef = useRef<RefType<T>>(null);
  const hasTriggeredRef = useRef(false);
  const parsedKeybindRef = useRef<Keybind>(parseKeybind(keybind));

  options = { ...defaultOptions, ...options };

  useSafeLayoutEffect(() => {
    parsedKeybindRef.current = parseKeybind(keybind);
  }, [keybind]);

  useSafeLayoutEffect(() => {
    const targetNode = nodeRef.current ?? document;

    const keydownHandler = (event: Event) => {
      if ((event as KeyboardEvent).key === undefined) return;

      keysPressed.add(normalize((event as KeyboardEvent).code));

      if (hasTriggeredRef.current) return;

      if (!options?.triggerInInput && isTriggeredInInputNode(event as KeyboardEvent)) {
        return;
      }

      if (
        isMatchingKeybind(event as KeyboardEvent, parsedKeybindRef.current, keysPressed)
      ) {
        callback(event as KeyboardEvent, parsedKeybindRef.current);
        hasTriggeredRef.current = true;
      }
    };

    const keyupHandler = (event: Event) => {
      if ((event as KeyboardEvent).key === undefined) return;

      keysPressed.delete(normalize((event as KeyboardEvent).code));

      if (hasTriggeredRef.current) {
        hasTriggeredRef.current = false;
      }
    };

    targetNode.addEventListener('keydown', keydownHandler);
    targetNode.addEventListener('keyup', keyupHandler);

    return () => {
      targetNode.removeEventListener('keydown', keydownHandler);
      targetNode.removeEventListener('keyup', keyupHandler);
    };
  }, [callback]);
}
