/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx,js,jsx,mdx}'],
  theme: {
    extend: {
      transitionProperty: {
        'border-color': 'border-color',
      },
      boxShadow: {
        input: '0 0 8px 2px rgba(251, 191, 36, 0.5)',
      },
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
        noto: ['var(--font-noto-sans-jp)', 'sans-serif'],
        mont: ['var(--font-montserrat)', 'sans-serif'],
      },
      borderWidth: {
        1: '1px',
      },
      // extend negative margin
      margin: {
        '-1': '-1px',
      },
      padding: {
        26: '6.5rem',
      },
      screens: {
        xs: '375px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@headlessui/tailwindcss')],
};
