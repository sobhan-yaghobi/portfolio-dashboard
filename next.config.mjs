/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bhnldizjuhewbimjejof.supabase.co",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
