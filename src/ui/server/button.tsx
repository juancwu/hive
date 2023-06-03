import React, { FC } from 'react';
import { VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { ButtonStyles } from '@/styles/components';

interface _ButtonProps extends VariantProps<typeof ButtonStyles> {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

type ButtonProps = _ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({
  disabled,
  size,
  intent,
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={twMerge(ButtonStyles({ size, intent, disabled: disabled }), className)}
      disabled={!!disabled}
      {...props}
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
