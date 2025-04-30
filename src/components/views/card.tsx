'use client'

import {Circle, type Icon} from '@phosphor-icons/react'
import Link from 'next/link'
import {Fragment} from 'react'

import {Heading, inter} from '@/components/layout'
import {Badge, Card, SimpleImage} from '@/components/ui'

type SimpleCardProps = {
    image?: string | null
    fallbackIcon: Icon
    title: string
    tags?: (TagProps | string)[]
    links?: ExternalLinkProps[]
    description?: string | null
}

export function SimpleCard({image, fallbackIcon, title, tags = [], links = [], description}: SimpleCardProps) {
    const Icon = fallbackIcon
    return (
        <Card rounded="md" ring shadow="sm">
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
                <Heading size="h3" withoutPadding>
                    <p className="line-clamp-2 px-4">{title}</p>
                </Heading>

                {tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 px-4 text-xs font-medium">
                        {tags.map((tag, i) => (
                            <Fragment key={i}>
                                {typeof tag === 'string' ? <Tag type="secondary" text={tag} /> : <Tag {...tag} />}
                                {i < tags.length - 1 && <Circle weight="fill" size={5} className="opacity-60" />}
                            </Fragment>
                        ))}
                    </div>
                )}
                {links.length > 0 && (
                    <div className="flex w-full flex-wrap gap-2 px-4 py-2">
                        {links.map((link, i) => (
                            <ExternalLink key={i} {...link} />
                        ))}
                    </div>
                )}
                {description && (
                    <>
                        <div className="my-1 h-px w-full bg-line dark:bg-line-dark" />
                        <p className={`${inter.className} px-4 text-sm font-semibold opacity-60`}>{description}</p>
                    </>
                )}
            </div>
        </Card>
    )
}

type TagProps =
    | {
          type: 'primary'
          icon: React.ReactNode
          text: string
      }
    | {
          type: 'secondary'
          text: string
      }

function Tag(props: TagProps) {
    if (props.type === 'secondary') return <p className="opacity-60">{props.text}</p>

    return (
        <>
            {props.icon}
            <p>{props.text}</p>
        </>
    )
}

type ExternalLinkProps = {
    url: string
    icon: Icon
    title: string
}

function ExternalLink({url, icon, title}: ExternalLinkProps) {
    const Icon = icon
    return (
        <Link href={url} target="_blank" className="active:opacity-60">
            <Badge size="sm" rounded="xl">
                <Icon weight="bold" />
                <p>{title}</p>
            </Badge>
        </Link>
    )
}
