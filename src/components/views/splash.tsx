import {SimpleImage} from '@/components/ui'
import {HLine} from '@/components/views/h-line'
import {Section} from '@/components/views/section'
import {PageStack} from '@/components/views/stack'

export function Splash({title, subtitle, image}: {title: string; subtitle?: string; image?: string}) {
    return (
        <Section>
            <PageStack>
                <HLine />
                <div className="grid auto-cols-fr grid-flow-row gap-6 lg:grid-flow-col">
                    <div className="size-full">
                        <SplashTextbox title={title} subtitle={subtitle} />
                    </div>
                    <div className="aspect-video w-full">
                        <SimpleImage url={image} alt={title} />
                    </div>
                </div>
            </PageStack>
        </Section>
    )
}

export function SplashTextbox({title, subtitle}: {title: string; subtitle?: string}) {
    return (
        <>
            <p className="line-clamp-3 font-heading text-6xl lg:text-9xl">{title}</p>
            {subtitle ? <p className="line-clamp-3 font-heading text-4xl lg:text-6xl">{subtitle}</p> : null}
        </>
    )
}
