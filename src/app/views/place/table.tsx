'use client'

import {getPlaceIcon} from './place-icon'

import {CityIcon, ForkKnifeIcon, HeartIcon, ImageIcon, LinkIcon, MapTrifoldIcon, PencilIcon, StarIcon, TagIcon, TextTIcon} from '@phosphor-icons/react'
import Link from 'next/link'

import {type Place} from '@/server/types'

import {countryFlag, googleMapsUrl, notionUrl} from '@/model/util'

import {SimpleImage} from '@/components/ui'
import {MenuBarItem} from '@/components/views/menu-bar'

type PlaceTableProps = {
    allPlace: Place[]
    bookmarks: string[]
    onToggleBookmark: (id: string) => void
}

export function PlaceTable({allPlace, bookmarks, onToggleBookmark}: PlaceTableProps) {
    return (
        <div className="mb-4 overflow-x-auto rounded-lg border border-line dark:border-line-dark">
            <table className="w-full border-collapse rounded-lg">
                <thead>
                    <tr className="text-left font-medium">
                        <TH>
                            <TextTIcon weight="bold" />
                            <p>Name</p>
                        </TH>
                        <TH>
                            <HeartIcon weight="bold" />
                        </TH>
                        <TH>
                            <StarIcon weight="bold" />
                            <p>Top</p>
                        </TH>
                        <TH>
                            <CityIcon weight="bold" />
                            <p>City</p>
                        </TH>
                        <TH>
                            <ImageIcon weight="bold" />
                            <p>Image</p>
                        </TH>
                        <TH>
                            <ForkKnifeIcon weight="bold" />
                            <p>Type</p>
                        </TH>
                        <TH>
                            <TagIcon weight="bold" />
                            <p>Tags</p>
                        </TH>
                        <TH>
                            <TextTIcon weight="bold" />
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

                            <TD>
                                <button onClick={() => onToggleBookmark(place.id)} className="active:opacity-60">
                                    <HeartIcon
                                        weight={bookmarks.includes(place.id) ? 'fill' : 'bold'}
                                        className={`${bookmarks.includes(place.id) ? 'text-red-500' : 'text-g-500'}`}
                                    />
                                </button>
                            </TD>

                            <TD>{place.top && <StarIcon weight="fill" className="text-yellow-400" />}</TD>

                            <TD>
                                <MenuBarItem>
                                    <div className="size-[1em]">
                                        <SimpleImage url={countryFlag(place.country_code)} />
                                    </div>
                                    <p>{place.city_name}</p>
                                </MenuBarItem>
                            </TD>

                            <TD>
                                {place.image && (
                                    <div className="aspect-video h-8 overflow-hidden rounded-md">
                                        <SimpleImage url={place.image} />
                                    </div>
                                )}
                            </TD>

                            <TD>
                                {place.type.map(p => {
                                    const Icon = getPlaceIcon(p, {returnDefault: false})
                                    return (
                                        <MenuBarItem key={p}>
                                            {Icon !== undefined && <Icon weight="duotone" />}
                                            <p>{p}</p>
                                        </MenuBarItem>
                                    )
                                })}
                            </TD>

                            <TD>
                                {place.tags.map(t => (
                                    <MenuBarItem key={t}>{t}</MenuBarItem>
                                ))}
                            </TD>

                            <TD>{place.description ? <p className="line-clamp-2 min-w-72 text-sm">{place.description}</p> : null}</TD>

                            <TD>
                                <Link href={googleMapsUrl({name: place.name, city_name: place.city_name, maps_id: place.maps_id})} target="_blank" className="active:opacity-60">
                                    <MenuBarItem>
                                        <MapTrifoldIcon weight="bold" />
                                        <p>Open in Maps</p>
                                    </MenuBarItem>
                                </Link>
                                <Link href={notionUrl(place.id)} target="_blank" className="active:opacity-60">
                                    <MenuBarItem>
                                        <PencilIcon weight="bold" />
                                        <p>Edit</p>
                                    </MenuBarItem>
                                </Link>
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
        <th className="border-r border-line px-2 py-1 last:border-r-0 dark:border-line-dark">
            <div className="flex items-center gap-1.5">{children}</div>
        </th>
    )
}

function TD({children}: {children?: React.ReactNode}) {
    return (
        <td className="border-r border-t border-line px-2 py-1.5 last:border-r-0 dark:border-line-dark">
            <div className="flex items-center gap-1.5">{children}</div>
        </td>
    )
}
