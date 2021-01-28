module.exports = ({ env, meteor }) => {
  const config = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  };

  if (meteor && env === "production") {
    config.plugins.autoprefixer = {
      browsers: ["defaults"],
    };
  }

  return config;
};
