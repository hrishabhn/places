import './style.css'

import {SimpleImage} from '@/components/ui'

type SplashProps = {
    title: string
    subtitle?: string
    image?: string
}

export function Splash({title, subtitle, image}: SplashProps) {
    return (
        <>
            <div className="relative aspect-square sm:aspect-video">
                <div className="gradient-mask absolute inset-0 z-10 bg-black/60 backdrop-blur" />
                <SimpleImage url={image} alt={title} />
                <div className="absolute inset-0 z-10 flex flex-col items-start justify-end p-4 text-white sm:p-10">
                    <SplashTextbox title={title} subtitle={subtitle} />
                </div>
            </div>
        </>
    )
}

type SplashTextboxProps = {
    title: string
    subtitle?: string
}

export function SplashTextbox({title, subtitle}: SplashTextboxProps) {
    return (
        <>
            <p className="line-clamp-3 font-heading text-6xl lg:text-9xl">{title}</p>
            {subtitle ? <p className="line-clamp-3 font-heading text-4xl lg:text-6xl">{subtitle}</p> : null}
        </>
    )
}
