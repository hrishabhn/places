import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
    experimental: {
        reactCompiler: true,
        ppr: true,
    },
    images: {
        remotePatterns: ['images.unsplash.com', 'images.lumacdn.com'].map(hostname => ({
            protocol: 'https',
            hostname,
        })),
    },
}

export default nextConfig
