import { cva } from 'class-variance-authority';

export const checkboxInputStyles = cva(
  'peer rounded-sm block m-0 appearance-none border-2 border-white/25 bg-current checked:text-amber-600 text-transparent hover:border-amber-400 transition disabled:hover:border-white/25 focus:ring-amber-400 focus:ring-offset-zinc-900',
  {
    variants: {
      size: {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
      },
      indeterminate: {
        true: 'text-amber-600 ',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);
