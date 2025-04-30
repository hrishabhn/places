'use client'

import {City, ForkKnife, type Icon, Image as ImageIcon, Link as LinkIcon, MapPin, Pencil, Star, Tag, TextT} from '@phosphor-icons/react'
import Link from 'next/link'

import {type Place} from '@/server/types'

import {googleMapsUrl, notionUrl} from '@/model/util'

import {Badge, SimpleImage} from '@/components/ui'

export function PlaceTable({allPlace}: {allPlace: Place[]}) {
    return (
        <div className="overflow-x-auto rounded-lg border border-line dark:border-line-dark">
            <table className="w-full border-collapse rounded-lg">
                <thead>
                    <tr className="text-left font-medium">
                        <TH>
                            <TextT weight="bold" />
                            <p>Name</p>
                        </TH>
                        <TH>
                            <Star weight="bold" />
                            <p>Top</p>
                        </TH>
                        <TH>
                            <City weight="bold" />
                            <p>City</p>
                        </TH>
                        <TH>
                            <ImageIcon weight="bold" />
                            <p>Image</p>
                        </TH>
                        <TH>
                            <ForkKnife weight="bold" />
                            <p>Type</p>
                        </TH>
                        <TH>
                            <Tag weight="bold" />
                            <p>Tags</p>
                        </TH>
                        <TH>
                            <TextT weight="bold" />
                            <p>Description</p>
                        </TH>
                        <TH>
                            <LinkIcon weight="bold" />
                            <p>Links</p>
                        </TH>
                    </tr>
                </thead>
                <tbody>
                    {allPlace.map(place => (
                        <tr key={place.id}>
                            <TD>
                                <p className="text-nowrap text-lg font-bold">{place.name}</p>
                            </TD>

                            <TD>{place.top && <Star weight="fill" className="text-yellow-400" />}</TD>

                            <TD>
                                <Badge size="sm" theme="g" border={false} rounded="xl">
                                    {place.city_name}
                                </Badge>
                            </TD>

                            <TD>
                                {place.image && (
                                    <div className="aspect-video h-8 overflow-hidden rounded-md">
                                        <SimpleImage url={place.image} />
                                    </div>
                                )}
                            </TD>

                            <TD>
                                {place.type.map(p => (
                                    <Badge key={p} size="sm" theme="g" border={false} rounded="xl">
                                        {p}
                                    </Badge>
                                ))}
                            </TD>

                            <TD>
                                {place.tags.map(t => (
                                    <Badge key={t} size="sm" theme="g" border={false} rounded="xl">
                                        {t}
                                    </Badge>
                                ))}
                            </TD>

                            <TD>
                                <p className="line-clamp-2 text-sm">{place.description}</p>
                            </TD>

                            <TD>
                                <ExternalLink url={googleMapsUrl({name: place.name, city_name: place.city_name, maps_id: place.maps_id})} icon={MapPin} title="Maps" />
                                <ExternalLink url={notionUrl(place.id)} icon={Pencil} title="Edit" />
                            </TD>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

// standard cells
function TH({children}: {children?: React.ReactNode}) {
    return (
        <th className="border border-transparent border-b-line border-r-line px-2 py-1 last:border-r-transparent dark:border-b-line-dark dark:border-r-line-dark">
            <div className="flex items-center gap-1.5">{children}</div>
        </th>
    )
}

function TD({children}: {children?: React.ReactNode}) {
    return (
        <td className="border border-transparent border-b-line border-r-line px-2 py-1.5 last:border-r-transparent dark:border-b-line-dark dark:border-r-line-dark">
            <div className="flex items-center gap-1.5">{children}</div>
        </td>
    )
}

// cell views
function ExternalLink({url, icon, title}: {url: string; icon: Icon; title: string}) {
    const Icon = icon
    return (
        <Link href={url} target="_blank" className="active:opacity-60">
            <Badge size="sm" theme="g" border={false} rounded="xl">
                <Icon weight="bold" />
                <p>{title}</p>
            </Badge>
        </Link>
    )
}
