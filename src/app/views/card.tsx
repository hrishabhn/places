'use client'

import {type PlaceComplete} from '@/model/types'
import {Circle, ForkKnife, MapPin, Pencil, Star} from '@phosphor-icons/react'
import Link from 'next/link'
import {Fragment} from 'react'

import {Heading} from '@/components/layout'
import {Card, IconButton, SimpleImage, TooltipText} from '@/components/ui'

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

            <div className="flex flex-col items-start gap-1 py-3">
                <div className="flex w-full gap-0.5 px-4">
                    <Heading size="h3" withoutPadding>
                        <p className="line-clamp-2">{place.name}</p>
                    </Heading>
                    <div className="grow" />
                    <Link href={place.url} target="_blank">
                        <TooltipText text="Edit">
                            <IconButton theme="hover" icon={Pencil} />
                        </TooltipText>
                    </Link>
                    {place.maps_data?.url && (
                        <Link href={place.maps_data.url} target="_blank">
                            <TooltipText text="Open in Maps">
                                <IconButton theme="hover" icon={MapPin} />
                            </TooltipText>
                        </Link>
                    )}
                </div>
                <div className="flex flex-wrap items-center gap-1.5 px-4 text-xs font-medium">
                    {place.top && (
                        <>
                            <Star weight="fill" className="text-yellow-400" />
                            <Circle weight="fill" size={5} className="opacity-60" />
                        </>
                    )}

                    <MapPin weight="bold" className="opacity-60" />
                    <p>{place.city.name}</p>

                    {info.map(tag => (
                        <Fragment key={tag}>
                            <Circle weight="fill" size={5} className="opacity-60" />
                            <p className="opacity-60">{tag}</p>
                        </Fragment>
                    ))}
                </div>

                {place.description && (
                    <>
                        <div className="my-2 h-px w-full bg-line dark:bg-line-dark" />
                        <p className="px-4">{place.description}</p>
                    </>
                )}
            </div>
        </Card>
    )
}
