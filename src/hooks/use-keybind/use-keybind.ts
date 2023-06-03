import { useLayoutEffect, useEffect, useRef } from 'react';

import { useDeepMemo } from '@/hooks';

import type { RefType, Keybind, KeybindCallback, UseKeybindOptions } from './types';
import { isMatchingKeybind, isTriggeredInInputNode } from './validators';
import { parseKeybind } from './parser';
import { normalize } from 'path';

const useSafeLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// global key pressed tracker
const keysPressed = new Set<string>();

const defaultOptions: UseKeybindOptions = {
  triggerInInput: false,
  enabled: true,
};

export default function useKeybind<T extends HTMLElement>(
  keybind: string[],
  callback: KeybindCallback,
  options?: UseKeybindOptions
) {
  const nodeRef = useRef<RefType<T>>(null);
  const hasTriggeredRef = useRef(false);
  const parsedKeybindRef = useRef<Keybind>(parseKeybind(keybind));

  const optionsMemo = useDeepMemo(
    { ...defaultOptions, ...options },
    (current, previous) => {
      if (typeof current !== 'object' || current === null) return false;
      if (typeof previous !== 'object' || previous === null) return false;

      return (
        Object.keys(current).length === Object.keys(previous).length &&
        Object.keys(current).reduce(
          (acc, key) => acc && current[key] === previous[key],
          true
        )
      );
    }
  );

  useSafeLayoutEffect(() => {
    parsedKeybindRef.current = parseKeybind(keybind);
  }, [keybind]);

  useSafeLayoutEffect(() => {
    const targetNode = nodeRef.current ?? document;

    const keydownHandler = (event: Event) => {
      if ((event as KeyboardEvent).key === undefined) return;

      keysPressed.add(normalize((event as KeyboardEvent).code));

      if (hasTriggeredRef.current) return;

      if (
        !optionsMemo?.triggerInInput &&
        isTriggeredInInputNode(event as KeyboardEvent)
      ) {
        return;
      }

      if (
        isMatchingKeybind(event as KeyboardEvent, parsedKeybindRef.current, keysPressed)
      ) {
        if (!optionsMemo?.enabled) {
          event.stopPropagation();
          event.preventDefault();
          event.stopImmediatePropagation();
          return;
        }

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
