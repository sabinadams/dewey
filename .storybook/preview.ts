import type { Preview } from '@storybook/react'
import '../src/styles/theme.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: 'rgb(24 24 27)', // zinc-900
        },
      ],
    },
    docs: {
      toc: true, // Enable table of contents
    },
  },
};

export default preview;