import type { KeyboardModifiers, Keybind } from './types';
import { KEYBOARD_KEY_ALIASES, MODIFIERS } from './common';

export function normalizeKey(key: string): string {
  return (KEYBOARD_KEY_ALIASES[key] || key)
    .trim()
    .toLowerCase()
    .replace(/key|digit|numpad|arrow/i, '');
}

export function extractNonModifierKeys(keys: string[]) {
  return keys.filter((key) => !MODIFIERS.has(key));
}

export function parseKeybind(keybind: string[]): Keybind {
  const keys = keybind.map(normalizeKey);
  const modifiers: KeyboardModifiers = {
    alt: keys.includes('alt'),
    ctrl: keys.includes('ctrl'),
    shift: keys.includes('shift'),
    meta: keys.includes('meta'),
    mod: keys.includes('mod'),
  };

  return {
    ...modifiers,
    keys: extractNonModifierKeys(keys),
  };
}
