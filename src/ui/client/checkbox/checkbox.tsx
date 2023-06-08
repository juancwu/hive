'use client';

import React, { forwardRef } from 'react';
import { CheckIcon, MinusSmallIcon } from '@heroicons/react/20/solid';
import { twMerge } from 'tailwind-merge';
import { VariantProps } from 'class-variance-authority';
import { useCheckboxGroupContext } from '@/ui/client/checkbox';
import {
  checkboxContainerStyles,
  checkboxInputStyles,
} from '@/styles/components/checkbox.styles';

interface CheckboxProps
  extends VariantProps<typeof checkboxInputStyles>,
    VariantProps<typeof checkboxContainerStyles>,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  className?: string;
  indeterminate?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { className, checked, indeterminate, disabled, size, ...rest } = props;
  const ctx = useCheckboxGroupContext();

  const contextProps = ctx
    ? {
        checked: ctx.values.includes(rest.value as string) || checked,
        onChange: ctx.onChange,
      }
    : {};

  return (
    <div className={twMerge(checkboxContainerStyles({ size }), className)}>
      <input
        ref={ref}
        type="checkbox"
        className={checkboxInputStyles({ indeterminate, size })}
        checked={checked}
        disabled={!!disabled}
        {...rest}
        {...contextProps}
      />
      {indeterminate && !checked ? (
        <MinusSmallIcon className="text-white absolute top-0 left-0 right-0 bottom-0 pointer-events-none m-auto" />
      ) : (
        checked && (
          <CheckIcon className="peer-checked:opacity-100 opacity-0 transition absolute top-0 left-0 right-0 bottom-0 m-auto pointer-events-none w-4/5 h-4/5" />
        )
      )}
    </div>
  );
});

Checkbox.displayName = 'ui/client/Checkbox';

export default Checkbox;
