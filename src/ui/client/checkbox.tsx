'use client';

import { useState, useEffect, FC } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { cva, VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const styles = cva(
  'flex items-center justify-center rounded-md border-2 border-solid border-neutral-700 cursor-pointer hover:border-amber-400',
  {
    variants: {
      size: {
        sm: 'w-5 h-5',
        md: 'w-6 h-6',
        lg: 'w-7 h-7',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

interface CheckboxProps extends VariantProps<typeof styles> {
  checked: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

const Checkbox: FC<CheckboxProps> = ({ checked, size, onClick, className, disabled }) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    if (disabled) return;
    setIsChecked(checked);
  }, [checked, disabled]);

  return (
    <div onClick={onClick} className={twMerge(styles({ size }), className)}>
      {isChecked && <CheckIcon className="text-green-500 w-full h-full" />}
    </div>
  );
};

export default Checkbox;
