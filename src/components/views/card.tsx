'use client'

import {ArrowRightIcon, type Icon} from '@phosphor-icons/react'
import {useState} from 'react'

import {Card, SimpleImage} from '@/components/ui'
import {HLine} from '@/components/views/h-line'

type SimpleCardProps = {
    image?: string | null
    fallbackIcon: Icon

    title: string
    subtitle?: string
    tags?: string[]
}

export function SimpleCard({image, fallbackIcon, title, subtitle, tags = []}: SimpleCardProps) {
    return (
        <div className="group">
            <HLine />

            <div className="grid grid-cols-[1fr_auto] items-center py-2">
                <div>
                    {subtitle ? <p className="line-clamp-1 font-serif text-sm font-semibold uppercase opacity-60">{subtitle}</p> : null}
                    <p className="line-clamp-1 font-serif text-xl font-medium">{title}</p>
                    <p className="line-clamp-1 text-xs font-semibold uppercase opacity-60">{tags.join(' • ')}</p>
                </div>
                <div className="-translate-x-1 scale-95 p-2 opacity-0 transition group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100">
                    <ArrowRightIcon weight="bold" className="text-xl" />
                </div>
            </div>

            <CardImage image={image} fallbackIcon={fallbackIcon} />
        </div>
    )
}

type CardImageProps = {
    image?: string | null
    fallbackIcon: Icon
}

function CardImage({image, fallbackIcon: Icon}: CardImageProps) {
    const [error, setError] = useState<boolean>(false)

    if (image && !error)
        return (
            <Card aspect="video">
                <SimpleImage url={image} alt="maps" onError={() => setError(true)} />
            </Card>
        )

    return (
        <div className="flex aspect-video items-center justify-center bg-olive/20 text-olive dark:bg-cream/10 dark:text-cream">
            <Icon size={24} weight="bold" />
        </div>
    )
}
