import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The design was first built at this path; "/" now serves it, so send
      // any old links there instead of keeping a duplicate URL alive.
      { source: "/premium-app-development", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
