import { cva } from 'class-variance-authority';

export const buttonStyles = cva(
  [
    'font-medium cursor-pointer border-none rounded-lg text-neutral-900 shadow-transparent transition duration-200 hover:duration-100 ease-linear',
    'active:translate-y-0.5 active:duration-0',
  ],
  {
    variants: {
      intent: {
        primary: 'bg-amber-400/10 text-amber-400 hover:ring-2 hover:ring-amber-400',
        secondary:
          'text-zinc-400 ring-2 ring-white/10 bg-white/5 hover:text-white hover:ring-white/25',
        action: 'bg-gradient-to-r from-amber-400 to-amber-300 disabled:opacity-30',
        danger: 'bg-red-400/10 text-red-400 hover:ring-2 hover:ring-red-400',
        success: 'bg-green-400/10 text-green-400 hover:ring-2 hover:ring-green-400',
      },
      size: {
        xs: 'h-8 px-3 text-xs hover:ring-1',
        sm: 'h-9 px-4 text-sm',
        md: 'h-10 px-5 text-base',
        lg: 'h-11 px-6 text-xl',
        xl: 'h-12 px-7 text-2xl',
      },
      disabled: {
        true: 'opacity-30 pointer-events-none text-zinc-400 ring-2 ring-white/10 bg-white/5 hover:text-white hover:ring-white/25',
      },
    },
    defaultVariants: {
      size: 'md',
      intent: 'primary',
    },
  }
);

export const buttonIconStyles = cva(['flex items-center justify-center mr-2'], {
  variants: {
    size: {
      xs: 'w-4 h-4',
      sm: 'w-4 h-4',
      md: 'w-[18px] h-[18px]',
      lg: 'w-[22px] h-[22px]',
      xl: 'w-[26px] h-[26px]',
    },
    onlyIcon: {
      true: 'mr-0',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
