'use client';

import React, { FC } from 'react';
import { VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { ButtonStyles } from '@/styles/components';

interface ButtonProps extends VariantProps<typeof ButtonStyles> {
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
      className={twMerge(ButtonStyles({ size, intent, disabled: disabled }), className)}
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
