import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
    reactCompiler: true,
    // cacheComponents: true,
    experimental: {
        turbopackFileSystemCacheForDev: true,
        // turbopackFileSystemCacheForBuild: true,
    },
    images: {
        // remotePatterns: allowedImageHosts.map(hostname => ({
        //     protocol: 'https',
        //     hostname,
        // })),
        minimumCacheTTL: 2592000, // 30 days
    },
}

export default nextConfig
