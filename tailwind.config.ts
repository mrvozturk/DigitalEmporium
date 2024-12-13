import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        customGray: '#f0f0f0'
      },
      boxShadow: {
        custom: '0 4px 8px rgba(0, 0, 0, 0.2)'
      },
      spacing: {
        '72': '18rem',
        '80': '20rem'
      },
      fontSize: {
        xs: ['0.75rem', '1rem'],
        sm: ['0.875rem', '1.25rem'],
        lg: ['1.125rem', '1.75rem'],
        xl: ['1.25rem', '2rem'],
        '2xl': ['1.5rem', '2.5rem'],
        '3xl': ['1.875rem', '2.625rem'],
        '4xl': ['2.25rem', '3rem'],
        '5xl': ['3rem', '4rem'],
        '6xl': ['3.75rem', '5rem'],
        '7xl': ['4.5rem', '6rem'],
        '8xl': ['6rem', '8rem'],
      },
      screens: {
        xs: { max: '568px' },
        sm: '569px',
        md: '768px',
        'md-lg': '890px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/line-clamp')
  ]
};

export default config;
