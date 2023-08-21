module.exports = {
  reactStrictMode: true,
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    SENDPULSE_ADDRESS_BOOK_ID: process.env.SENDPULSE_ADDRESS_BOOK_ID,
    SENDPULSE_ID: process.env.SENDPULSE_ID,
    SENDPULSE_SECRET: process.env.SENDPULSE_SECRET,
    REFERRER: process.env.REFERRER,
    REFFERAL: process.env.REFFERAL,
    DB: process.env.DB,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },

  webpack: (config, { isServer }) => {
    config.experiments = { ...config.experiments, topLevelAwait: true },
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: "preset-default",
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
};
