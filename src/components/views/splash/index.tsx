import './style.css'

import {type Icon} from '@phosphor-icons/react'

import {SimpleImage} from '@/components/ui'

type SplashProps = {
    icon?: React.ReactNode
    title: string
    subtitle?: string
    image?: string
}

export function Splash({icon, title, subtitle, image}: SplashProps) {
    return (
        <>
            <div className="relative aspect-[4/5] w-full sm:aspect-video">
                <div className="gradient-mask absolute inset-0 z-10 bg-black/60 backdrop-blur" />
                <SimpleImage url={image} alt={title} />
                <div className="absolute inset-0 z-10 flex flex-col items-start justify-end p-4 text-white sm:p-10">
                    {icon}
                    <p className="line-clamp-3 font-heading text-6xl lg:text-9xl">{title}</p>
                    {subtitle ? <p className="line-clamp-3 font-heading text-4xl lg:text-6xl">{subtitle}</p> : null}
                </div>
            </div>
        </>
    )
}

export function SplashIconContainer({children}: {children?: React.ReactNode}) {
    return <div className="my-2 rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur-sm">{children}</div>
}

export function SplashIcon({icon: Icon}: {icon: Icon}) {
    return (
        <SplashIconContainer>
            <div className="flex size-12 items-center justify-center">
                <Icon size={24} />
            </div>
        </SplashIconContainer>
    )
}
