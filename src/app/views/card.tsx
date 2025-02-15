'use client'

import {type PlaceComplete} from '@/model/types'
import {ForkKnife, MapPin} from '@phosphor-icons/react'
import Link from 'next/link'

import {notionColorToTheme} from '@/lib/notion/color'

import {Heading} from '@/components/layout'
import {Badge, Card, IconButton, SimpleImage, TooltipText} from '@/components/ui'

export function PlaceCard({place}: {place: PlaceComplete}) {
    const info = [...place.type.map(({name}) => name), ...place.tags.map(({name}) => name)]

    return (
        <Card rounded="md" ring shadow="sm">
            {place.maps_photo ? (
                <Card aspect="video">
                    <SimpleImage url={place.maps_photo || undefined} alt="maps" />
                </Card>
            ) : (
                <div className="flex aspect-video items-center justify-center bg-accent/20">
                    <ForkKnife size={24} weight="bold" />
                </div>
            )}

            <div className="h-px w-full bg-line dark:bg-line-dark" />

            <div className="flex flex-col items-start gap-1 px-4 py-3">
                <div className="flex w-full gap-2">
                    <Heading size="h3" withoutPadding>
                        <p className="line-clamp-2">{place.name}</p>
                    </Heading>
                    <div className="grow" />
                    {place.maps_data?.url && (
                        <Link href={place.maps_data.url} target="_blank">
                            <TooltipText text="Maps">
                                <IconButton theme="hover" icon={MapPin} />
                            </TooltipText>
                        </Link>
                    )}
                </div>
                {info.length > 0 && <p className="text-xs font-semibold opacity-60">{info.join(' • ')}</p>}
                <div className="py-1">
                    <Badge theme={notionColorToTheme(place.city.color)}>{place.city.name}</Badge>
                </div>
                {place.maps_data?.formatted_address && <p className="line-clamp-2 text-xs font-medium opacity-80">{place.maps_data.formatted_address}</p>}
            </div>
        </Card>
    )
}
