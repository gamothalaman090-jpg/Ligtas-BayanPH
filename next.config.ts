import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disabled: React 18 Strict Mode double-invokes effects in development,
  // which conflicts with GSAP ScrollTrigger's pin feature (moves DOM nodes
  // and creates spacer divs that React tries to removeChild after unmount).
  // This only affects development — production builds are unaffected.
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
