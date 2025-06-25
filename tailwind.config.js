// tailwind.config.js
import plugin from 'tailwind-scrollbar-hide';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {},
  },
  plugins: [plugin],
};
