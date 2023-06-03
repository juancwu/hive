'use client';

import React, { FC } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const styles = cva(
  [
    'font-medium cursor-pointer border-none rounded-lg text-neutral-900 shadow-transparent transition duration-200 hover:duration-100 ease-linear',
    'disabled:text-zinc-900 disabled:bg-zinc-700 disabled:cursor-default disabled:hover:bg-zinc-700 disabled:hover:ring-0',
    'active:translate-y-0.5 active:duration-0 disabled:active:translate-y-0',
  ],
  {
    variants: {
      size: {
        xs: 'h-8 px-3 text-xs',
        sm: 'h-9 px-4 text-sm',
        md: 'h-10 px-5 text-base',
        lg: 'h-11 px-6 text-xl',
        xl: 'h-12 px-7 text-2xl',
      },
      intent: {
        primary: 'bg-amber-400/10 text-amber-400 hover:ring-1 hover:ring-amber-400',
        secondary:
          'text-zinc-400 ring-1 ring-white/10 bg-white/5 hover:text-white hover:ring-white/25',
        action: 'bg-gradient-to-r from-amber-400 to-amber-300 disabled:opacity-30',
        danger: 'bg-red-400/10 text-red-400 hover:ring-1 hover:ring-red-400',
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
  disabled?: boolean;
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
      className={twMerge(styles({ size, intent }), className)}
      onClick={onClick}
      disabled={!!disabled}
    >
      <div className="flex items-center justify-center h-full overflow-visible">
        <span className="whitespace-nowrap overflow-hidden h-full flex items-center">
          {children}
        </span>
      </div>
    </button>
  );
};

export default Button;
