/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output standalone for OpenNext Lambda packaging (P3.2+)
  // output: "standalone",

  // Allow images from Setav S3 buckets
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
    ],
  },

  // Emotion needs transpilation in RSC-compatible setup
  transpilePackages: ["@mui/material", "@mui/icons-material"],
};

export default nextConfig;
