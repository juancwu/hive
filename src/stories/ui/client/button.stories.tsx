import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/ui/client';
import SupabaseProvider from '@/providers/supabase-provider';

const meta: Meta<typeof Button> = {
  title: 'ui/client/button',
  component: Button,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return (
        <SupabaseProvider session={null}>
          <Story />
        </SupabaseProvider>
      );
    },
  ],
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
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/inventory',
      },
    },
  },
  args: {
    children: 'Button',
    intent: 'primary',
    size: 'md',
  },
};
