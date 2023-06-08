import { cva } from 'class-variance-authority';

export const checkboxContainerStyles = cva('flex items-center relative', {
  variants: {
    size: {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});

export const checkboxInputStyles = cva(
  'peer rounded-sm block m-0 appearance-none border-2 border-white/25 checked:text-amber-600 text-transparent bg-current hover:border-amber-400 transition disabled:hover:border-white/25',
  {
    variants: {
      size: {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
      },
      indeterminate: {
        true: 'text-white/25',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  }
);
