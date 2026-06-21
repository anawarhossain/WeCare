/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*", // Allows any domain
        port: "",
        pathname: "/**", // Allows any path inside that domain
      },
    ],
  },

  reactCompiler: true,
};

export default nextConfig;
