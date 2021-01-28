module.exports = {
  corePlugins: {
    // Remove this line to reset basic style
    preflight: false,
  },
  purge: ["./imports/ui/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
