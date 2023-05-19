module.exports = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  "name": "preset-default",
                  "params": {
                    "overrides": {
                      "removeViewBox": false
                    }
                  }
                }
              ],
            },
          },
        },
      ],
    });

    return config;
  },
};
