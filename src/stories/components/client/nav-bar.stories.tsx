import type { Meta, StoryObj } from '@storybook/react';
import { NavBar } from '@/components/client';
import SupabaseProvider from '@/providers/supabase-provider';

const meta: Meta<typeof NavBar> = {
  title: 'UI/NavBar',
  component: NavBar,
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
};

export default meta;
type Story = StoryObj<typeof NavBar>;

export const Inventory: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/inventory',
      },
    },
  },
};
