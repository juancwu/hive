import { VariantProps, cva } from 'class-variance-authority';

export const inputBaseStyles = cva(
  'block w-full rounded-md border-0 py-1.5 pr-10 bg-white/5 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:text-sm sm:leading-6',
  {
    variants: {
      invalid: {
        true: 'text-red-400 ring-red-600 placeholder:text-red-300 focus:ring-red-500',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed hover:ring-white/10',
      },
    },
  }
);

export const inputMessageStyles = cva('mt-2 text-sm text-zinc-400', {
  variants: {
    invalid: {
      true: 'text-red-600',
    },
  },
});

export type InputBaseStylesProps = VariantProps<typeof inputBaseStyles>;
