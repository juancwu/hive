import { cva } from 'class-variance-authority';

export const tableColStyles = cva(
  'py-4 px-4 border-b-1 border-b-white/5 text-zinc-400 hover:text-white transition',
  {
    variants: {
      header: {
        true: 'capitalize text-left font-semibold text-white',
      },
      type: {
        text: 'min-w-[12rem] max-w-md truncate',
        key: 'text-white min-w-[12rem]',
        link: 'text-sky-400 cursor-pointer hover:underline hover:text-sky-400',
        number: 'text-green-400 hover:text-green-400',
      },
    },
  }
);
