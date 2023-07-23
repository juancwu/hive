import { cva } from 'class-variance-authority';

export const ToggleBaseStyles = cva(
  'bg-gray-300 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2',
  {
    variants: {
      enabled: {
        true: 'bg-amber-500',
      },
    },
  }
);

export const ToggleBallStyles = cva(
  'translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
  {
    variants: {
      enabled: {
        true: 'translate-x-5',
      },
    },
  }
);
