export type KeyboardModifiers = {
  alt: boolean;
  ctrl: boolean;
  shift: boolean;
  meta: boolean;
  mod: boolean;
};

export type Keybind = KeyboardModifiers & {
  keys: string[];
};

export type RefType<T> = T | null;

export type KeybindCallback = (
  event: KeyboardEvent,
  keybind: Keybind
) => void | Promise<void>;

export type UseKeybindOptions = {
  triggerInInput?: boolean;
  enabled?: boolean;
} & Record<string, any>;
