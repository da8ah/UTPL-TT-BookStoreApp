module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["module-resolver", {
        "alias": {
          "@Assets": "./assets"
        },
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx"
        ]
      }]
    ]
  };
};
