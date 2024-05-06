import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
    fontFamily: {
      'boo': ['"Fjalla One"', 'sans-serif'],
      'han': ['"PT Sans Narrow"', 'sans-serif'],
      'honk': ['Honk', 'system-ui'],
      'ps2': ['Press Start 2P', 'system-ui'],
      'pr': ['Protest Revolution', 'sans-serif']
    },
  },
  /* darkMode: "class", */
  plugins: [nextui()]
}