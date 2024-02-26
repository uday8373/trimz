// next.config.js

module.exports = {
  async redirects() {
    return [
      {
        source: "/api/auth/google",
        destination: "/api/auth/google",
        permanent: true,
      },
      {
        source: "/api/auth/google/callback",
        destination: "/api/auth/googleCallback",
        permanent: true,
      },
    ];
  },
};
