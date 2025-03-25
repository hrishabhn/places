'use client'

import {useHomeContext} from '../context'

import {City, ForkKnife, GoogleLogo, type Icon, Image as ImageIcon, Link as LinkIcon, MagnifyingGlass, MapPin, Pencil, Star, Tag, TextT} from '@phosphor-icons/react'
import Link from 'next/link'

import {type NotionPlace} from '@/model/types'
import {googleMapsUrl} from '@/model/util'

import {notionColorToTheme} from '@/lib/notion/color'

import {Badge, SimpleImage} from '@/components/ui'

export function HomeTable({allPlace}: {allPlace: NotionPlace[]}) {
    const {adminMode} = useHomeContext()

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
                                <Badge size="sm" theme={notionColorToTheme(place.city.color)} border={false} rounded="xl">
                                    {place.city.name}
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
                                    <Badge key={p.id} size="sm" theme={notionColorToTheme(p.color)} border={false} rounded="xl">
                                        {p.name}
                                    </Badge>
                                ))}
                            </TD>

                            <TD>
                                {place.tags.map(t => (
                                    <Badge key={t.id} size="sm" theme={notionColorToTheme(t.color)} border={false} rounded="xl">
                                        {t.name}
                                    </Badge>
                                ))}
                            </TD>

                            <TD>
                                <p className="line-clamp-2 text-sm">{place.description}</p>
                            </TD>

                            <TD>
                                <ExternalLink url={googleMapsUrl(place)} icon={MapPin} title="Maps" />
                                <ExternalLink url={place.url} icon={Pencil} title="Edit" />

                                {adminMode && (
                                    <>
                                        <ExternalLink url={`https://www.google.com/search?q=${encodeURIComponent(place.name)}`} icon={GoogleLogo} title="Google Search" />
                                        <ExternalLink url={`https://www.google.com/images?q=${encodeURIComponent(place.name)}`} icon={GoogleLogo} title="Google Images" />
                                        <ExternalLink url={`https://www.bing.com/images/search?q=${encodeURIComponent(place.name)}`} icon={MagnifyingGlass} title="Bing Images" />
                                    </>
                                )}
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
            <Badge size="sm" border={false} rounded="xl">
                <Icon weight="bold" />
                <p>{title}</p>
            </Badge>
        </Link>
    )
}
