'use client';

import React, { forwardRef } from 'react';
import { VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { buttonStyles } from '@/styles/components/button.styles';

interface ButtonProps
  extends VariantProps<typeof buttonStyles>,
    Omit<React.HTMLProps<HTMLButtonElement>, 'disabled' | 'size'> {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ onClick, disabled, size, intent, className, children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge(buttonStyles({ size, intent, disabled: disabled }), className)}
        onClick={onClick}
        disabled={!!disabled}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'ui/client/button';
