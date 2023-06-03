import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/ui/client';

const meta: Meta<typeof Button> = {
  title: 'ui/client/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    intent: {
      options: ['primary', 'secondary', 'action', 'danger'],
      control: { type: 'select' },
    },
    disabled: {
      options: [true, false],
      control: { type: 'boolean' },
    },
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
  },
};

export default meta;
type ButtonStory = StoryObj<typeof Button>;

export const Primary: ButtonStory = {
  args: {
    children: 'Button',
    intent: 'primary',
    size: 'md',
  },
};

export const Secondary: ButtonStory = {
  args: {
    children: 'Button',
    intent: 'secondary',
    size: 'md',
  },
};

export const Action: ButtonStory = {
  args: {
    children: 'Button',
    intent: 'action',
    size: 'md',
  },
};

export const Danger: ButtonStory = {
  args: {
    children: 'Button',
    intent: 'danger',
    size: 'md',
  },
};

export const Disabled: ButtonStory = {
  args: {
    children: 'Button',
    intent: 'primary',
    size: 'md',
    disabled: true,
  },
};