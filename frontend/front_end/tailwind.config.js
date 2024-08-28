/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Add custom scrollbar utilities
      scrollbar: {
        hidden: {
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          '.scrollbar-hidden': {
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none',
          },
          '.scrollbar-hidden::-webkit-scrollbar': {
            display: 'none',
          },
        },
        ['responsive', 'hover']
      );
    },
  ],
}
