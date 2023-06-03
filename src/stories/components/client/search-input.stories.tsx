import type { Meta, StoryObj } from '@storybook/react';
import { SearchInput } from '@/components/client/search-input';
import { SupabaseProvider } from '@/providers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function wrapWithContainer(Story: any) {
  return (
    <div className="mx-auto max-w-sm bg-zinc-900 ring-zinc-800 sm:max-w-xl opacity-100 scale-100 overflow-hidden rounded-lg ring-2 ring-white/10 shadow">
      <Story />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function wrapWithSupabaseProvider(Story: any) {
  return (
    <SupabaseProvider session={null}>
      <Story />
    </SupabaseProvider>
  );
}

const meta: Meta<typeof SearchInput> = {
  title: 'components/client/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  decorators: [wrapWithSupabaseProvider],
  parameters: {
    docs: {
      description: {
        component:
          'A search input component which can be used anywhere on the app with the SupabaseProvider supplied. The component takes the entire width of the container. For demonstration purposes, the containers width is set to 384px.',
      },
    },
  },
};

export default meta;
type SearchInputStory = StoryObj<typeof SearchInput>;

export const Default: SearchInputStory = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    docs: {
      description: {
        story:
          'A search input component does not have a lot of styling. This is mainly because it should be used in combination with a container/wrapper component.',
      },
    },
  },
  args: {
    placeholder: 'Placeholder',
  },
};

export const Styled: SearchInputStory = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    docs: {
      description: {
        story:
          'The borders and max-width of the search input can be styled by wrapping the component with a container/wrapper component. Note: The results of the search input are not styled by the wrapper.',
      },
    },
  },
  args: {
    placeholder: 'Placeholder',
  },
  decorators: [wrapWithContainer],
};
