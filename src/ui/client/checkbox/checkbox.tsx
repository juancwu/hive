'use client';

import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { VariantProps } from 'class-variance-authority';
import { useCheckboxGroupContext } from '@/ui/client/checkbox/checkbox-group.context';
import { checkboxInputStyles } from '@/styles/components/checkbox.styles';

interface CheckboxProps
  extends VariantProps<typeof checkboxInputStyles>,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  className?: string;
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { className, checked, indeterminate, disabled, size, ...rest } = props;
  const ctx = useCheckboxGroupContext();

  const contextProps = ctx
    ? {
        checked: ctx.values.includes(rest.value as string) || checked,
        onChange: ctx.onChange,
      }
    : {};

  return (
    <input
      ref={ref}
      type="checkbox"
      className={twMerge(checkboxInputStyles({ indeterminate, size }), className)}
      checked={checked}
      disabled={!!disabled}
      {...rest}
      {...contextProps}
    />
  );
});

Checkbox.displayName = '@/ui/client/Checkbox';
