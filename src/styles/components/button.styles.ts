import { cva } from 'class-variance-authority';

export const buttonStyles = cva('font-semibold shadow-sm active:scale-95', {
  variants: {
    intent: {
      primary: 'bg-amber-400 text-gray-900 hover:bg-amber-300',
      secondary:
        'bg-white/5 text-zinc-400 border-2 border-white/10 hover:border-white/20',
      action: 'bg-gradient-to-r from-amber-400 to-amber-300 disabled:opacity-30',
      danger: 'bg-red-500 text-white hover:bg-red-400',
      success: 'bg-green-600 text-zinc-200 hover:bg-green-500',
    },
    size: {
      xs: 'rounded px-2 py-1 text-xs',
      sm: 'rounded px-2 py-1 text-xs',
      md: 'rounded-md px-2.5 py-1.5 text-sm',
      lg: 'rounded-md px-3 py-2 text-sm',
      xl: 'rounded-md px-3.5 py-2.5 text-sm',
    },
    disabled: {
      true: 'opacity-30 pointer-events-none text-zinc-400 ring-2 ring-white/10 bg-white/5 hover:text-white hover:ring-white/25',
    },
  },
  defaultVariants: {
    size: 'md',
    intent: 'primary',
  },
});
