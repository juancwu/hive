'use client';

import React, { FC } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const styles = cva(
  [
    'font-semibold cursor-pointer border-none rounded-lg text-neutral-900 shadow-transparent transition-shadow duration-200 ease-linear',
    'transition-transform duration-100',
  ],
  {
    variants: {
      size: {
        sm: 'py-1 px-2 text-xs rounded-sm',
        md: 'py-3 px-6 text-base',
        lg: 'py-3 px-6 text-xl',
      },
      intent: {
        primary: 'bg-amber-400',
        secondary: 'bg-amber-300',
        gradient: 'bg-gradient-to-r from-amber-400 to-amber-300',
        danger: 'bg-red-400',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed bg-neutral-700 ',
        false: 'hover:scale-110',
      },
    },
    defaultVariants: {
      size: 'md',
      intent: 'primary',
    },
  }
);

interface ButtonProps extends VariantProps<typeof styles> {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const Button: FC<ButtonProps> = ({
  onClick,
  disabled,
  size,
  intent,
  className,
  children,
}) => {
  return (
    <button
      className={twMerge(styles({ size, intent, disabled: !!disabled }), className)}
      onClick={onClick}
      disabled={!!disabled}
    >
      {children}
    </button>
  );
};

export default Button;
