import { cva } from 'class-variance-authority';

export const tableRowStyles = cva('px-6 py-4 w-12 relative border-b-1 border-b-white/5', {
  variants: {
    checked: {
      true: 'bg-white/5',
    },
  },
});

export const tableColStyles = cva(
  'py-4 px-4 border-b-1 border-b-white/5 text-sm text-zinc-400 hover:text-white transition',
  {
    variants: {
      header: {
        true: 'capitalize text-left font-bold text-white',
      },
      type: {
        text: 'min-w-[220px]',
        key: 'text-white min-w-[220px]',
        link: 'link',
        number: 'text-green-400 hover:text-green-400',
      },
    },
  }
);
