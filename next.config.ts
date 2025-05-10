import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
    experimental: {
        dynamicIO: true,
        useCache: true,
        reactCompiler: true,
        ppr: true,
    },
}

export default nextConfig
