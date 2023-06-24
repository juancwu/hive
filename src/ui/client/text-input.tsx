'use client';

import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import {
  inputBaseStyles,
  inputMessageStyles,
  InputBaseStylesProps,
} from '@/styles/components/text-input.styles';
import { useRandomId } from '@/hooks/use-random-id';

type InputElementOmits = 'aria-describedBy' | 'aria-invalid';

interface TextInputProps
  extends Omit<InputBaseStylesProps, 'disabled'>,
    Omit<React.HTMLProps<HTMLInputElement>, InputElementOmits> {
  /** Label of input */
  label?: string;

  /** Custom classes, will always override default classes */
  className?: string;

  /** The message to show when input is invalid */
  invalidMessage?: string;

  /** Text shown below of input */
  hint?: string;

  /** renders the invalid message */
  invalid?: boolean;

  /** Only allow this three because they are text based */
  type?: 'text' | 'email' | 'password';

  /** Shows an optional text */
  optional?: boolean;

  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const {
    className,
    label,
    id,
    invalidMessage,
    hint,
    invalid,
    disabled,
    optional,
    ...rest
  } = props;

  const randomIdPrefix = 'text-input';
  const inputRandomId = useRandomId(randomIdPrefix);
  const messageId = useRandomId(randomIdPrefix);
  const optionalTextId = useRandomId(randomIdPrefix);

  return (
    <div>
      <div className="flex justify-between">
        {label && (
          <label
            htmlFor={id ?? inputRandomId}
            className="block text-sm font-medium leading-6 text-white"
          >
            {label}
          </label>
        )}
        {optional && (
          <span className="text-sm leading-6 text-zinc-400" id={optionalTextId}>
            Optional
          </span>
        )}
      </div>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          ref={ref}
          id={id ?? inputRandomId}
          aria-invalid={invalid ? 'true' : 'false'}
          aria-describedby={`${messageId} ${optionalTextId}`}
          className={twMerge(inputBaseStyles({ disabled, invalid }), className)}
          {...rest}
        />
        {invalid && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
      </div>
      {(invalid && invalidMessage) || hint ? (
        <p className={inputMessageStyles({ invalid })} id={messageId}>
          {invalid && invalidMessage ? invalidMessage : hint ?? ''}
        </p>
      ) : null}
    </div>
  );
});

TextInput.displayName = '@/ui/client/text-input';
