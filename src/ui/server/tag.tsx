import React from 'react';
import type { FC } from 'react';
import { tagBaseStyles } from '@/styles/ui/tag.styles';
import { twMerge } from 'tailwind-merge';

type TagColours = 'green' | 'yellow' | 'blue';

interface TagProps {
  text: string;
  colour: TagColours;
  className?: string;
}

export const Tag: FC<TagProps> = ({ text, colour, className }) => {
  return <span className={twMerge(tagBaseStyles({ colour }), className)}>{text}</span>;
};
