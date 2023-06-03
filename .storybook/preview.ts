import '../src/styles/globals.css';
import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';

export const parameters = {
  nextjs: {
    appDirectory: true,
  },
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      theme: themes.dark,
    }
  },
};

export default preview;
