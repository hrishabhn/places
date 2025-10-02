import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
    experimental: {
        dynamicIO: true,
        useCache: true,
        reactCompiler: true,
        ppr: true,
    },
    images: {
        domains: ['images.unsplash.com'],
    },
}

export default nextConfig
