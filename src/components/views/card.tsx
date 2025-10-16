'use client'

import {ArrowRightIcon, type Icon, StarIcon} from '@phosphor-icons/react'
import {useState} from 'react'

import {SimpleImage} from '@/components/ui'
import {HLine} from '@/components/views/h-line'

type SimpleCardProps = {
    image?: string | null
    fallbackIcon: Icon

    title: string
    subtitle?: string
    tags?: string[]
    top?: boolean
}

export function SimpleCard({image, fallbackIcon, title, subtitle, tags = [], top = false}: SimpleCardProps) {
    return (
        <div className="group">
            <CardImage image={image} fallbackIcon={fallbackIcon} />

            <div className="grid grid-cols-[1fr_auto] items-center py-2">
                <div>
                    {subtitle ? <p className="line-clamp-1 font-serif text-sm font-bold uppercase opacity-60">{subtitle}</p> : null}
                    {top ? (
                        <div className="flex items-center gap-1">
                            <StarIcon weight="fill" size={18} className="text-accent-dark" />
                            <Title title={title} />
                        </div>
                    ) : (
                        <Title title={title} />
                    )}
                    <p className="line-clamp-1 text-xs font-semibold uppercase opacity-60">{tags.join(' • ')}</p>
                </div>
                <div className="-translate-x-1 scale-95 p-2 opacity-0 transition group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100">
                    <ArrowRightIcon weight="bold" className="text-xl" />
                </div>
            </div>

            <HLine />
        </div>
    )
}

type CardImageProps = {
    image?: string | null
    fallbackIcon: Icon
}

function CardImage({image, fallbackIcon: Icon}: CardImageProps) {
    const [error, setError] = useState<boolean>(false)

    if (!image || error)
        return (
            <div className="flex aspect-video items-center justify-center bg-accent-dark/20">
                <Icon size={24} weight="bold" />
            </div>
        )

    return <SimpleImage src={image} aspect="video" onError={() => setError(true)} />
}

function Title({title}: {title: string}) {
    return <p className="line-clamp-1 font-serif text-xl font-semibold">{title}</p>
}
