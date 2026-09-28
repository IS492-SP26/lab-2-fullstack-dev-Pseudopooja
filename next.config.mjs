/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Hide the floating Next.js dev tools button while reviewing locally
  devIndicators: false,
  images: {
    // 90 is used for the travel gallery so photos stay crisp
    qualities: [75, 90],
  },
  turbopack: {
    root: new URL(".", import.meta.url).pathname,
  },
}

export default nextConfig
