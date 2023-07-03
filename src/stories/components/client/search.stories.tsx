import type { Meta, StoryObj } from '@storybook/react';
import { Search } from '@/components/client/search';
import { SupabaseProvider } from '@/providers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function wrapWithSupabaseProvider(Story: any) {
  return (
    <SupabaseProvider session={null}>
      <Story />
    </SupabaseProvider>
  );
}

const meta: Meta<typeof Search> = {
  title: 'components/client/Search',
  component: Search,
  tags: ['autodocs'],
  decorators: [wrapWithSupabaseProvider],
  parameters: {
    docs: {
      description: {
        component:
          'A search component which can be used anywhere on the app with the SupabaseProvider supplied.',
      },
    },
  },
};

export default meta;
type SearchStory = StoryObj<typeof Search>;

export const Default: SearchStory = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    enableKeybind: true,
  },
  argTypes: {
    enableKeybind: {
      defaultValue: true,
      type: 'boolean',
    },
  },
};
