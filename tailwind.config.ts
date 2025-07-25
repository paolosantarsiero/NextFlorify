import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

// tailwind.config.js

const spacing = Object.fromEntries(
  Array.from({ length: 300 }, (_, i) => {
    return [String(i), `${i * 0.25}rem`];
  })
);

const config: Config = {
  content: [
    './__feats/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './@/components/ui/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      spacing: {
        ...spacing
      },
      colors: {
        'dark-gray-1': 'hsl(var(--dark-gray-1))',
        'gray-2': 'hsl(var(--gray-2))',
        'dark-violet': 'hsl(var(--dark-violet))',
        'faded-dark-violet': 'hsl(var(--faded-dark-violet))',
        tiffanyGreen: 'hsl(var(--tiffanyGreen))',
        'faded-tiffanyGreen': 'hsl(var(--faded-tiffanyGreen))',
        'extra-faded-tiffanyGreen': 'hsl(var(--extra-faded-tiffanyGreen))',
        violetRose: 'hsl(var(--violetRose))',
        'faded-violetRose': 'hsl(var(--faded-violetRose))',
        'extra-faded-violetRose': 'hsl(var(--extra-faded-violetRose))',
        lilac: 'hsl(var(--lilac))',
        'faded-lilac': 'hsl(var(--faded-lilac))',
        'extra-faded-lilac': 'hsl(var(--extra-faded-lilac))',
        engravedCard: 'hsl(var(--engravedCard))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        'faded-foreground': 'hsl(var(--faded-foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      fontFamily: {
        sans: ['var(--font-poppins)']
      },
      keyframes: {
        fadeIn: {
          from: {
            opacity: '0'
          },
          to: {
            opacity: '1'
          }
        },
        marquee: {
          '0%': {
            transform: 'translateX(0%)'
          },
          '100%': {
            transform: 'translateX(-100%)'
          }
        },
        blink: {
          '0%': {
            opacity: '0.2'
          },
          '20%': {
            opacity: '1'
          },
          '100%': {
            opacity: '0.2'
          }
        }
      },
      animation: {
        fadeIn: 'fadeIn .3s ease-in-out',
        carousel: 'marquee 60s linear infinite',
        blink: 'blink 1.4s both infinite'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  future: {
    hoverOnlyWhenSupported: true
  },
  darkMode: ['class', 'class'],
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar-hide'),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'animation-delay': (value) => {
            return {
              'animation-delay': value
            };
          }
        },
        {
          values: theme('transitionDelay')
        }
      );
    }),
    require('tailwindcss-animate')
  ]
};

export default config;
