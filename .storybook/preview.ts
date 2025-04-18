import type { Preview } from '@storybook/react'
import '../src/styles/theme.css'

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
      },
      story: {
        inline: false, // Display the story in an iframe
        height: 'auto',
        iframeHeight: 'auto',
      },
    },
    options: {
      storySort: {
        order: ['UI', ['*']], // Sort UI stories first
      },
    },
  },
};

// Add a document decorator to fix Storybook UI scrolling issues
export const decorators = [
  (Story) => {
    // Add this style tag to the document to fix scrolling
    if (typeof document !== 'undefined') {
      const style = document.createElement('style');
      style.innerHTML = `
        #storybook-preview-wrapper {
          overflow: auto !important;
          padding-bottom: 2rem;
        }
        #storybook-preview-iframe {
          height: auto !important;
          min-height: 100%;
        }
        .docs-story {
          overflow: visible !important;
          padding-bottom: 2rem;
        }
        [role="main"] {
          overflow: auto !important;
        }
      `;
      document.head.appendChild(style);
    }
    return Story();
  },
];

export default preview;