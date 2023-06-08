import React, { FC, useCallback } from 'react';
import { CheckboxGroupProvider } from './checkbox-group.context';

export interface CheckboxGroupProps {
  values: string[];
  onChange: (values: string[]) => void;
  className?: string;
  children?: React.ReactNode;
}

export const CheckboxGroup: FC<CheckboxGroupProps> = ({
  values,
  className,
  children,
  onChange,
}) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      onChange(
        values.includes(value) ? values.filter((v) => v !== value) : [...values, value]
      );
    },
    [onChange, values]
  );

  return (
    <CheckboxGroupProvider value={{ values, onChange: handleChange }}>
      <div className={className}>{children}</div>
    </CheckboxGroupProvider>
  );
};
