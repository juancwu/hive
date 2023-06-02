const PLATFORMS: Record<string, string> = {
  windows: 'win',
  win32: 'win',
  win64: 'win',
  wince: 'win',
  macintosh: 'mac',
  macintel: 'mac',
  macppc: 'mac',
  mac68k: 'mac',
  linux: 'linux',
  x11: 'linux',
  android: 'android',
  iphone: 'ios',
  ipad: 'ios',
  ipod: 'ios',
};

export default function getOperatingSystem() {
  if (typeof window === 'undefined') return null;
  if (typeof window.navigator === 'undefined') return null;
  if (typeof window.navigator.platform === 'undefined') return null;

  const platform = PLATFORMS[window.navigator.platform.toLowerCase()];

  return platform || null;
}
