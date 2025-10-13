import {SimpleImage} from '@/components/ui'
import {Section} from '@/components/views/section'
import {DetailStack} from '@/components/views/stack'

export function Splash({title, subtitle, image}: {title: string; subtitle?: string; image?: string}) {
    return (
        <Section>
            <DetailStack>
                <div className="grid auto-cols-fr grid-flow-row gap-6 lg:grid-flow-col">
                    <div className="size-full">
                        <p className="line-clamp-3 font-heading text-6xl lg:text-9xl">{title}</p>
                        {subtitle ? <p className="line-clamp-3 font-heading text-4xl lg:text-6xl">{subtitle}</p> : null}
                    </div>
                    <div className="aspect-video w-full">
                        <SimpleImage url={image} alt={title} />
                    </div>
                </div>
            </DetailStack>
        </Section>
    )
}
