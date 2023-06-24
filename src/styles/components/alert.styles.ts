import { VariantProps, cva } from 'class-variance-authority';

export const alertContainerStyles = cva('rounded-md p-4 w-full ring-1', {
  variants: {
    type: {
      success: 'bg-[#172A20] ring-green-600',
      error: 'bg-[#37191B] ring-red-600',
      warning: 'bg-[#332418] ring-yellow-600',
      info: 'bg-[#1A223D] ring-blue-600',
    },
  },
  defaultVariants: {
    type: 'success',
  },
});

export const alertTextStyles = cva('text-sm font-medium', {
  variants: {
    type: {
      success: 'text-green-200',
      error: 'text-red-200',
      warning: 'text-yellow-200',
      info: 'text-blue-200',
    },
  },
  defaultVariants: {
    type: 'success',
  },
});

export const alertClearButtonStyles = cva('inline-flex rounded-md p-1.5 transition', {
  variants: {
    type: {
      success: 'text-green-200 hover:bg-green-900 bg-[#172A20] focus:outline-green-600',
      error: 'text-red-200 hover:bg-red-900 bg-[#37191B] focus:outline-red-600',
      warning:
        'text-yellow-200 hover:bg-yellow-900 bg-[#332418] focus:outline-yellow-600',
      info: 'text-blue-200 hover:bg-blue-900 bg-[#1A223D] focus:outline-blue-600',
    },
  },
  defaultVariants: {
    type: 'success',
  },
});

export type AlertStylesProps = VariantProps<typeof alertContainerStyles> &
  VariantProps<typeof alertTextStyles> &
  VariantProps<typeof alertClearButtonStyles>;
