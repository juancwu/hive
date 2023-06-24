import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from '@/ui/client/text-input';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function wrapWithContainer(Story: any) {
  return (
    <div className="w-96">
      <Story />
    </div>
  );
}

const meta: Meta<typeof TextInput> = {
  title: 'ui/client/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  decorators: [wrapWithContainer],
  parameters: {
    docs: {
      description: {
        component:
          'A text input component with label and error message. The component takes the entire width of the container. For demonstration purposes, the containers width is set to 384px.',
      },
    },
  },
};

export default meta;
type TextInputStory = StoryObj<typeof TextInput>;

export const Default: TextInputStory = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    disabled: false,
    hasError: false,
    errorMessage: 'Error message',
  },
};

export const Disabled: TextInputStory = {
  args: {
    label: 'Disabled',
    placeholder: 'Placeholder',
    disabled: true,
    hasError: false,
    errorMessage: 'Error message',
  },
};

export const Error: TextInputStory = {
  args: {
    label: 'Error',
    placeholder: 'Placeholder',
    disabled: false,
    hasError: true,
    errorMessage: 'Error message',
  },
};
