'use client';

import React, { FC, useId } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const inputStyles = cva(
  [
    'pr-4 pl-4 w-full h-full ring-1 ring-white/10 transition rounded-lg outline-none bg-white/5 text-zinc-400 text-base',
  ],
  {
    variants: {
      error: {
        true: 'ring-red-400',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
        false:
          'hover:ring-amber-400 focus-visible:shadow-input focus-visible:ring-amber-200 focus-visible:text-amber-200',
      },
    },
  }
);

const containerStyles = cva('relative w-full h-12');

type ContainerStylesProps = VariantProps<typeof containerStyles>;

type InputStylesProps = VariantProps<typeof inputStyles>;

type TextInputProps = {
  withAsterisk?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  className?: string;
  autoFocus?: boolean;

  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
} & ContainerStylesProps &
  InputStylesProps;

const TextInput: FC<TextInputProps> = ({
  hasError,
  errorMessage,
  label,
  className,
  disabled,
  ...props
}) => {
  const uid = useId();

  return (
    <div>
      {label && (
        <>
          <span className="text-neutral-400 mb-2 block">{label}</span>
          <label
            className="absolute w-0 h-0 overflow-hidden border-0"
            id={`label-${uid}`}
            htmlFor={`input-${uid}`}
          >
            {label}
          </label>
        </>
      )}
      <div className={twMerge(containerStyles())}>
        <input
          id={`input-${uid}`}
          aria-labelledby={`label-${uid}`}
          aria-autocomplete="none"
          className={twMerge(
            inputStyles({ error: hasError, disabled: !!disabled }),
            className
          )}
          disabled={!!disabled}
          {...props}
        />
      </div>
      {hasError && errorMessage && (
        <span className="text-red-400 text-sm">{errorMessage}</span>
      )}
    </div>
  );
};

export default TextInput;
