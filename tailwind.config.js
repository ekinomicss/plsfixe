module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        bodoni: ['Bodoni Moda SC', 'serif'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.small-caps': {
          'font-variant': 'small-caps',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
