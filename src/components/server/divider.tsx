import { FC } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const styles = cva('', {
  variants: {
    size: {
      sm: 'w-2 h-2',
      md: 'w-5 h-5',
      lg: 'w-10 h-10',
    },
    direction: {
      horizontal: 'w-full',
      vertical: 'h-full',
    },
  },
  defaultVariants: {
    size: 'md',
    direction: 'horizontal',
  },
});

interface DividerProps extends VariantProps<typeof styles> {
  className?: string;
}

const Divider: FC<DividerProps> = ({ className, size, direction }) => {
  return <div className={twMerge(styles({ size, direction }), className)}></div>;
};

export default Divider;
