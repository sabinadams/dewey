import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base text colors
        'text-primary': 'rgb(var(--text-primary))',
        'text-secondary': 'rgb(var(--text-secondary))',
        'text-muted': 'rgb(var(--text-muted))',
        
        // Status colors
        'status-success': 'rgb(var(--status-success))',
        'status-error': 'rgb(var(--status-error))',
        'status-warning': 'rgb(var(--status-warning))',
        'status-info': 'rgb(var(--status-info))',
        
        // UI element colors
        'ui-primary': 'rgb(var(--ui-primary))',
        'ui-secondary': 'rgb(var(--ui-secondary))',
        'ui-accent': 'rgb(var(--ui-accent))',
        
        // Background colors
        'bg-primary': 'rgb(var(--bg-primary))',
        'bg-secondary': 'rgb(var(--bg-secondary))',
        'bg-muted': 'rgb(var(--bg-muted))',
      },
    },
  },
  plugins: [],
}

export default config 