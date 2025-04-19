import type { Preview } from '@storybook/react'
import '../src/styles/theme.css'
import './preview.css'
// Add a global style fix for Storybook UI
const preview: Preview = {
  parameters: {
    layout: 'padded',
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
      canvas: {
        layout: 'padded',
      }
    },
    options: {
      storySort: {
        order: ['UI', ['*']], // Sort UI stories first
      },
    },
  },
};



export default preview;