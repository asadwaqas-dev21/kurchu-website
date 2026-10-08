import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The design was first built at this path; "/" now serves it, so send
      // any old links there instead of keeping a duplicate URL alive.
      { source: "/premium-app-development", destination: "/", permanent: true },

      // Website development and SEO are no longer offered. These URLs were live,
      // so redirect them permanently rather than letting links and rankings 404.
      { source: "/web-development", destination: "/services", permanent: true },
      { source: "/seo-services", destination: "/services", permanent: true },
      { source: "/blog/how-much-does-a-business-website-cost", destination: "/blog", permanent: true },
      { source: "/blog/local-seo-checklist-google-maps", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
