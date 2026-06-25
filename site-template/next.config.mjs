/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone output required by OpenNext for Lambda packaging.
  // This copies all required Node.js files into .next/standalone so the Lambda
  // bundle is self-contained without a full node_modules tree.
  output: "standalone",

  // Allow images from Setav S3 buckets and YouTube thumbnails
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "setav-prod-contacts.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "setav-dev-sites.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "setav-prod-sites.s3.ap-south-1.amazonaws.com",
      },
      {
        // YouTube thumbnail images used in the YouTube section
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        // Wildcard for any Setav S3 env bucket (dev, staging, prod)
        protocol: "https",
        hostname: "*.s3.ap-south-1.amazonaws.com",
      },
    ],
  },

  // Emotion needs transpilation in RSC-compatible setup
  transpilePackages: ["@mui/material", "@mui/icons-material"],
};

export default nextConfig;
