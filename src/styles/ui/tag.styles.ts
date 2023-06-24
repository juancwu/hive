import { cva } from 'class-variance-authority';

export const tagBaseStyles = cva(
  'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
  {
    variants: {
      colour: {
        green: 'ring-green-700 text-green-300 bg-green-900',
        yellow: 'ring-yellow-700 text-yellow-300 bg-yellow-900',
        blue: 'ring-blue-700 text-blue-300 bg-blue-900',
      },
    },
  }
);
