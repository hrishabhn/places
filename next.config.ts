import type {NextConfig} from 'next'

import {allowedImageHosts} from '@/model/image'

const nextConfig: NextConfig = {
    experimental: {
        reactCompiler: true,
        ppr: true,
    },
    images: {
        remotePatterns: allowedImageHosts.map(hostname => ({
            protocol: 'https',
            hostname,
        })),
    },
}

export default nextConfig
