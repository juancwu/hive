import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@/ui/client';

const meta: Meta<typeof Checkbox> = {
  title: 'ui/client/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
  },
};

export default meta;
type CheckboxStory = StoryObj<typeof Checkbox>;

export const Default: CheckboxStory = {
  args: {
    checked: false,
    disabled: false,
    size: 'md',
  },
};
