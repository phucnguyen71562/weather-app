module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
  purge: ['./src/**/*.tsx'],
  theme: {
    extend: {},
    fontFamily: {
      roboto: 'Roboto',
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/ui')],
};
