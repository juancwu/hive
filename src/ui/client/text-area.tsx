'use client';

import React, { forwardRef } from 'react';
import { TextAreaStyles } from '@/styles/components/text-area.styles';
import { VariantProps } from 'class-variance-authority';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { twMerge } from 'tailwind-merge';
import { useRandomId } from '@/hooks/use-random-id';
import {
  inputBaseStyles,
  inputMessageStyles,
} from '@/styles/components/text-input.styles';

interface TextAreaProps
  extends VariantProps<typeof TextAreaStyles>,
    React.HTMLProps<HTMLTextAreaElement> {
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
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { className, label, optional, id, invalid, disabled, invalidMessage, hint, ...rest },
    ref
  ) => {
    const randomIdPrefix = 'text-area';
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
          <textarea
            ref={ref}
            id={id ?? inputRandomId}
            aria-invalid={invalid ? 'true' : 'false'}
            aria-describedby={`${messageId} ${optionalTextId}`}
            className={twMerge(inputBaseStyles({ disabled, invalid }), className)}
            rows={3}
            {...rest}
          />
          {invalid && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
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
  }
);

TextArea.displayName = 'ui/client/text-area';
