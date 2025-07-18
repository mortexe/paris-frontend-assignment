import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'some-placeholder.com',
            },
        ],
    },
};

export default nextConfig;
