// next.config.js

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
    ],
  },
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
