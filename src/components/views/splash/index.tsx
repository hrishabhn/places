import './style.css'
import {SplashTextBox} from './textbox'

import {type Icon} from '@phosphor-icons/react'

import {SimpleImage} from '@/components/ui'
import {Section} from '@/components/views/section'

type SplashProps = {
    actions?: React.ReactNode
    title: string
    subtitle?: string
    image?: string
}

export function Splash({actions, title, subtitle, image}: SplashProps) {
    if (image === undefined)
        return (
            <Section>
                <div className="flex flex-col items-start pt-6 sm:pt-8">
                    <SplashTextBox actions={actions} title={title} subtitle={subtitle} />
                </div>
            </Section>
        )

    return (
        <>
            <div className="relative aspect-[4/5] w-full sm:aspect-video">
                <div className="gradient-mask absolute inset-0 z-10 bg-black/60 backdrop-blur" />
                <SimpleImage src={image} />
                <div className="absolute inset-0 z-10 flex flex-col items-start justify-end p-4 text-white sm:p-10">
                    <SplashTextBox actions={actions} title={title} subtitle={subtitle} />
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
