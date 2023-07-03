import { cva } from 'class-variance-authority';

export const fileInputContainerStyles = cva(
  'mt-2 cursor-pointer flex justify-center rounded-lg border border-dashed border-white/10 px-6 py-10 focus-visible:outline-none focus-visible:border-amber-400 hover:border-amber-400',
  {
    variants: {
      active: {
        true: 'border-amber-400',
      },
      disabled: {
        true: 'focus-visible:outline-none focus-visible:border-white/10 hover:border-white/10 cursor-default pointer-events-none',
      },
      noClick: {
        true: 'hover:border-white/10',
      },
    },
  }
);

export const fileInputLabelStyles = cva(
  'block text-sm font-medium leading-6 text-white cursor-default',
  {
    variants: {
      disabled: {
        true: 'text-white/25',
      },
    },
  }
);

export const fileInputIconStyles = cva('mx-auto h-12 w-12 text-gray-300', {
  variants: {
    disabled: {
      true: 'text-white/10',
    },
  },
});

export const fileInputInputTextStyles = cva(
  'relative cursor-pointer rounded-md font-semibold text-amber-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-amber-400 focus-within:ring-offset-2 ring-offset-zinc-900 hover:text-amber-300',
  {
    variants: {
      disabled: {
        true: 'text-white/10 hover:text-white/10 focus-within:ring-0 pointer-events-none',
      },
    },
  }
);

export const fileInputHintStyles = cva('text-xs leading-5 text-gray-600', {
  variants: {
    disabled: {
      true: 'text-white/10 pointer-events-none',
    },
  },
});
