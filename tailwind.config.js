/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './submodules/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    fontFamily: {
      heading: ['IvarText', ...defaultTheme.fontFamily.sans],
      alpha: ['Poppins', ...defaultTheme.fontFamily.sans]
    },
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      '8xl': '6rem',
      '9xl': '8rem'
    },
    extend: {
      colors: {
        // Set admin colours and the fallback values (This should be the same in every project)
        nsAdmin: {
          50: `hsla(var(--color-admin-h, 232), var(--color-admin-s, 57%), 90%, var(--tw-bg-opacity, 1))`,
          100: `hsla(var(--color-admin-h, 232), var(--color-admin-s, 57%), 87%, var(--tw-bg-opacity, 1))`,
          200: `hsla(var(--color-admin-h, 232), var(--color-admin-s, 57%), 74%, var(--tw-bg-opacity, 1))`,
          300: `hsla(var(--color-admin-h, 232), var(--color-admin-s, 57%), 61%, var(--tw-bg-opacity, 1))`,
          400: `hsla(var(--color-admin-h, 232), var(--color-admin-s, 57%), 48%, var(--tw-bg-opacity, 1))`,
          DEFAULT: `hsla(var(--color-admin-h, 232), var(--color-admin-s, 57%), 35%), var(--tw-bg-opacity, 1))`,
          600: `hsla(var(--color-admin-h, 232), var(--color-admin-s, 57%), 28%, var(--tw-bg-opacity, 1))`,
          700: `hsla(var(--color-admin-h, 232), var(--color-admin-s, 57%), 21%, var(--tw-bg-opacity, 1))`,
          800: `hsla(var(--color-admin-h, 232), var(--color-admin-s, 57%), 14%, var(--tw-bg-opacity, 1))`,
          900: `hsla(var(--color-admin-h, 232), var(--color-admin-s, 57%), 7%, var(--tw-bg-opacity, 1))`
        },
        nsAdminHex: '#0C102C',

        alpha: {
          100: '#7a7c83',
          150: '#6f7178',
          200: '#64666e',
          250: '#595b64',
          300: '#4e5059',
          350: '#43454f',
          400: '#383a45',
          450: '#2d2f3a',
          DEFAULT: '#222430',
          550: '#20222e',
          600: '#1f202b',
          650: '#1d1f29',
          700: '#1b1d26',
          750: '#1a1b24',
          800: '#181922',
          850: '#16171f',
          900: '#14161d',
          950: '#13141a',
          highlight: {
            DEFAULT: '#4C547D',
            light: '#72789C',
            dark: '#3F3D56'
          },
          light: {
            100: '#e7e8ee',
            200: '#dfe0e8',
            300: '#d7d8e3',
            400: '#ced0dd',
            DEFAULT: '#c6c8d7',
            600: '#bec1d1',
            700: '#b6b9cc',
            800: '#AEB1C6',
            900: '#9d9fb2'
          }
        },
        bravo: '#FBBC05',
        error: {
          DEFAULT: '#B33030',
          light: '#D0826D',
          highlight: '#EA4335'
        },
        success: {
          DEFAULT: '#34A853',
          light: '#93B68C',
          dark: '#417735'
        },
        warning: {
          DEFAULT: '#B37730',
          light: '#D09B6D'
        },
        gold: '#FFCC48',
        silver: '#DCE6F1',
        bronze: '#D09B6D',
        gray: colors.neutral
      },
      spacing: {
        header: '4.5rem'
      },
      maxWidth: {
        '8xl': '1440px'
      },
      screens: {
        xs: '390px'
      }
    }
  },
  plugins: [require('@tailwindcss/container-queries')]
};
