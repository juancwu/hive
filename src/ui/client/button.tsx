'use client';

import React, { FC } from 'react';
import { VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { buttonIconStyles, buttonStyles } from '@/styles/components';

interface ButtonProps extends VariantProps<typeof buttonStyles> {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const Button: FC<ButtonProps> = ({
  onClick,
  disabled,
  size,
  intent,
  className,
  icon,
  children,
}) => {
  return (
    <button
      className={twMerge(buttonStyles({ size, intent, disabled: disabled }), className)}
      onClick={onClick}
      disabled={!!disabled}
    >
      <div className="flex items-center justify-center h-full overflow-visible">
        {!!icon && <span className={twMerge(buttonIconStyles({ size }))}>{icon}</span>}
        <span className="whitespace-nowrap overflow-hidden h-full flex items-center">
          {children}
        </span>
      </div>
    </button>
  );
};

export default Button;
