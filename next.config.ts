import { withPayload } from "@payloadcms/next/withPayload";
import redirects from "./redirects.js";
import type { NextConfig } from "next";

const NEXT_PUBLIC_SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

const url = new URL(NEXT_PUBLIC_SERVER_URL);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  redirects,

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: url.protocol.replace(":", ""),
        hostname: url.hostname,
        port: url.port || "3000",
        pathname: "/api/media/file/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "3000",
        pathname: "/api/media/file/**",
      },
      {
        protocol: "http",
        hostname: "::1",
        port: "3000",
        pathname: "/api/media/file/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },

  webpack(config) {
    config.resolve.extensionAlias = {
      ".cjs": [".cts", ".cjs"],
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
    };
    return config;
  },
};

export default withPayload(nextConfig);
