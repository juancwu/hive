import type { Meta, StoryObj } from '@storybook/react';
import { InventoryCreatePart } from '@/app/inventory/client/inventory-create-part';

const meta: Meta<typeof InventoryCreatePart> = {
  title: 'pages/inventory/InventoryCreatePart',
  component: InventoryCreatePart,
  tags: ['autodocs'],
};
export default meta;

type InventoryCreatePartStory = StoryObj<typeof InventoryCreatePart>;

export const Default: InventoryCreatePartStory = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/inventory',
      },
    },
  },
};
