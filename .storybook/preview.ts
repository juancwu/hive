import '../src/styles/css/globals.css';
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
      expanded: true,
    },
    docs: {
      theme: themes.dark,
    }
  },
};

export default preview;
