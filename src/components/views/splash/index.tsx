import './style.css'

import {SimpleImage} from '@/components/ui'

type SplashProps = {
    url: string
    alt?: string
    children?: React.ReactNode
}

export function Splash({url, alt = 'Splash', children}: SplashProps) {
    return (
        <div className="relative aspect-video max-h-[768px] w-full">
            <SimpleImage url={url} alt={alt} verticalAlign="top" />
            <div className="gradient-mask absolute inset-0 bg-black/20 backdrop-blur-xl" />
            <div className="absolute inset-0 flex items-end justify-start p-4 text-white sm:px-10 sm:py-8">{children}</div>
        </div>
    )
}
