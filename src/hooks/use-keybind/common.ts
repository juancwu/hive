export enum KEYBOARD_MODIFIERS {
  alt = 'alt',
  ctrl = 'ctrl',
  shift = 'shift',
  meta = 'meta',
  mod = 'mod',
}

// spread the enum into an array
export const MODIFIERS = new Set<string>([
  KEYBOARD_MODIFIERS.alt,
  KEYBOARD_MODIFIERS.ctrl,
  KEYBOARD_MODIFIERS.shift,
  KEYBOARD_MODIFIERS.meta,
  KEYBOARD_MODIFIERS.mod,
]);

export const KEYBOARD_KEY_ALIASES: Record<string, string> = {
  ShiftLeft: 'shift',
  ShiftRight: 'shift',
  AltLeft: 'alt',
  AltRight: 'alt',
  MetaLeft: 'meta',
  MetaRight: 'meta',
  OS: 'os',
  OSLeft: 'meta',
  OSRight: 'meta',
  Control: 'ctrl',
  ControlLeft: 'ctrl',
  ControlRight: 'ctrl',
  ArrowUp: 'up',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ArrowDown: 'down',

  // aliases
  '/': 'slash',
  '\\': 'backslash',
  esc: 'escape',
  return: 'enter',
  win: 'os',
  cmd: 'meta',
  command: 'meta',
  windows: 'os',
};
