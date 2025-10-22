import type {NextConfig} from 'next'

import {allowedImageHosts} from '@/model/image'

const nextConfig: NextConfig = {
    reactCompiler: true,
    // cacheComponents: true,
    experimental: {
        turbopackFileSystemCacheForDev: true,
        // turbopackFileSystemCacheForBuild: true,
    },
    images: {
        remotePatterns: allowedImageHosts.map(hostname => ({
            protocol: 'https',
            hostname,
        })),
    },
}

export default nextConfig
