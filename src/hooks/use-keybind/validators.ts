import type { Keybind } from './types';
import { KEYBOARD_MODIFIERS } from './common';
import { normalizeKey } from './parser';

export function isTriggeredInInputNode(event: KeyboardEvent): boolean {
  const { target } = event;
  const targetTagName = (target as HTMLElement).tagName.toLowerCase();

  return ['input', 'textarea', 'select'].includes(targetTagName);
}

export function isMatchingKeybind(
  event: KeyboardEvent,
  keybind: Keybind,
  keysPressed: Set<string>
): boolean {
  const { alt, ctrl, shift, meta, mod, keys } = keybind;
  const { altKey, ctrlKey, shiftKey, metaKey } = event;
  const keyPressed = normalizeKey(event.code);

  // check modifiers against event
  if (alt && !altKey && keyPressed !== KEYBOARD_MODIFIERS.alt) return false;
  if (ctrl && !ctrlKey && keyPressed !== KEYBOARD_MODIFIERS.ctrl) return false;
  if (shift && !shiftKey && keyPressed !== KEYBOARD_MODIFIERS.shift) return false;

  if (mod) {
    if (!metaKey && !ctrlKey) return false;
  } else {
    if (
      meta &&
      !metaKey &&
      keyPressed !== KEYBOARD_MODIFIERS.meta &&
      keyPressed !== 'os'
    ) {
      return false;
    }
    if (ctrl && !ctrlKey && keyPressed !== KEYBOARD_MODIFIERS.ctrl) {
      return false;
    }
  }

  // check keys against event
  if (keys.length === 0) return true;
  if (keys.length === 1) return keyPressed === keys[0];

  return keys.every((key) => keysPressed.has(key));
}
