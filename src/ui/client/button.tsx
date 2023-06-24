'use client';

import React, { forwardRef } from 'react';
import { VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { buttonStyles } from '@/styles/components/button.styles';

interface ButtonProps extends VariantProps<typeof buttonStyles> {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ onClick, disabled, size, intent, className, children }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge(buttonStyles({ size, intent, disabled: disabled }), className)}
        onClick={onClick}
        disabled={!!disabled}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = '@/ui/client/button';
