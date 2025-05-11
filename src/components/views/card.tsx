'use client'

import {TagTray, type Tags} from './tags'

import {Heart, type Icon} from '@phosphor-icons/react'
import Link from 'next/link'

import {Heading} from '@/components/layout'
import {Badge, Card, SimpleImage} from '@/components/ui'

type SimpleCardProps = {
    image?: string | null
    fallbackIcon: Icon
    title: string
    tags?: Tags
    bookmark?: boolean
    onBookmark?: () => void
    links?: CardLinkProps[]
    description?: string | null
}

export function SimpleCard({image, fallbackIcon, title, tags = [], bookmark, onBookmark, links = [], description}: SimpleCardProps) {
    const Icon = fallbackIcon
    return (
        <Card rounded="md" ring>
            {image ? (
                <Card aspect="video">
                    <SimpleImage url={image} alt="maps" />
                </Card>
            ) : (
                <div className="flex aspect-video items-center justify-center bg-accent/20 dark:bg-accent-dark/20">
                    <Icon size={24} weight="bold" />
                </div>
            )}

            <div className="h-px w-full bg-line dark:bg-line-dark" />

            <div className="flex flex-col items-start gap-1 py-3">
                <div className="flex w-full items-start gap-1 px-4">
                    <div className="space-y-1">
                        <Heading size="h3" withoutPadding>
                            <p className="line-clamp-2">{title}</p>
                        </Heading>
                        <TagTray tags={tags} size="sm" />
                    </div>

                    <div className="grow" />

                    {bookmark !== undefined && (
                        <button className="active:opacity-60" onClick={() => onBookmark?.()}>
                            <Heart weight={bookmark ? 'fill' : 'bold'} className={`text-lg ${bookmark ? 'text-accent dark:text-accent-dark' : 'text-g-500'}`} />
                        </button>
                    )}
                </div>

                {links.length > 0 && (
                    <div className="flex w-full flex-wrap gap-2 px-4 py-2">
                        {links.map((link, i) => (
                            <CardLink key={i} {...link} />
                        ))}
                    </div>
                )}
                {description && (
                    <>
                        <div className="my-1 h-px w-full bg-line dark:bg-line-dark" />
                        <p className="px-4 text-sm font-semibold opacity-60">{description}</p>
                    </>
                )}
            </div>
        </Card>
    )
}

type CardLinkProps = {
    url: string
    icon: Icon
    title: string
}

function CardLink({url, icon, title}: CardLinkProps) {
    const Icon = icon
    return (
        <Link href={url} target={url.startsWith('http') ? '_blank' : undefined} className="active:opacity-60">
            <Badge size="sm" rounded="xl">
                <Icon weight="bold" />
                <p>{title}</p>
            </Badge>
        </Link>
    )
}
