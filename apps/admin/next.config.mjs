/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  transpilePackages: ["@red-velvet/ui", "@red-velvet/types", "@red-velvet/shared"],
};

export default nextConfig;
