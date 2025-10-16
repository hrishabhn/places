import './style.css'

import {type Icon} from '@phosphor-icons/react'

import {SimpleImage} from '@/components/ui'

type SplashProps = {
    actions?: React.ReactNode
    title: string
    subtitle?: string
    image?: string
}

export function Splash({actions, title, subtitle, image}: SplashProps) {
    return (
        <>
            <div className="relative aspect-[4/5] w-full sm:aspect-video">
                <div className="gradient-mask absolute inset-0 z-10 bg-black/60 backdrop-blur" />
                <SimpleImage url={image} alt={title} />
                <div className="absolute inset-0 z-10 flex flex-col items-start justify-end p-4 text-white sm:p-10">
                    <div className="grid auto-cols-auto grid-flow-col gap-2 py-2">{actions}</div>
                    <p className="line-clamp-3 font-heading text-6xl lg:text-9xl">{title}</p>
                    {subtitle ? <p className="line-clamp-3 font-heading text-4xl lg:text-6xl">{subtitle}</p> : null}
                </div>
            </div>
        </>
    )
}

export function SplashIconContainer({children}: {children?: React.ReactNode}) {
    return <div className="rounded-full ring-1 ring-white/20 backdrop-blur-sm backdrop-brightness-50 backdrop-saturate-200">{children}</div>
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
