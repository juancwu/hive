'use client';

import React, { FC, useId } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const inputStyles = cva(
  [
    'pr-4 pl-4 w-full h-full ring-2 ring-white/10 transition rounded-lg outline-none bg-white/5 placeholder:text-zinc-400 text-white text-base',
    'hover:ring-amber-400 focus-visible:ring-amber-200',
  ],
  {
    variants: {
      error: {
        true: 'ring-red-500 hover:ring-red-400 focus-visible:ring-red-300',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed hover:ring-white/10',
      },
    },
  }
);

interface TextInputProps
  extends VariantProps<typeof inputStyles>,
    React.HTMLAttributes<HTMLInputElement> {
  /** Shows an asterisk beside the label */
  withAsterisk?: boolean;

  /** Set to true to display error message and set the style to error */
  hasError?: boolean;

  /** Error message to display */
  errorMessage?: string;

  /** Label of input */
  label?: string;

  /** Placeholder text */
  placeholder?: string;

  /** Value to set in the input */
  value?: string;

  /** Custom classes, will always override default classes */
  className?: string;

  /** Autofocuses the input when is visible */
  autoFocus?: boolean;

  type?: string;

  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const TextInput: FC<TextInputProps> = ({
  hasError = false,
  errorMessage = '',
  label = '',
  disabled = false,
  className,
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
      <div className="relative w-full h-12">
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
        <span className="text-red-500 text-sm">{errorMessage}</span>
      )}
    </div>
  );
};

export default TextInput;
