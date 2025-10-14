import {SimpleImage} from '@/components/ui'
import {Section} from '@/components/views/section'

export function Splash({title, subtitle, description, image}: {title: string; subtitle?: string; description?: string; image?: string}) {
    return (
        <Section>
            <div className="grid auto-cols-fr grid-flow-row gap-6 lg:grid-flow-col">
                <div className="size-full">
                    <SplashTextbox title={title} subtitle={subtitle} description={description} />
                </div>
                <div className="aspect-video w-full">
                    <SimpleImage url={image} alt={title} />
                </div>
            </div>
        </Section>
    )
}

export function SplashTextbox({title, subtitle, description}: {title: string; subtitle?: string; description?: string}) {
    return (
        <>
            <p className="line-clamp-3 font-heading text-6xl lg:text-9xl">{title}</p>
            {subtitle ? <p className="line-clamp-3 font-heading text-4xl lg:text-6xl">{subtitle}</p> : null}
            {description ? <p className="line-clamp-5 font-serif text-xl lg:text-2xl">{description}</p> : null}
        </>
    )
}
