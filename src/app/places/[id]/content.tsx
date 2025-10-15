'use client'

import {HeartIcon, MapTrifoldIcon, PencilIcon} from '@phosphor-icons/react'
import {useSuspenseQuery} from '@tanstack/react-query'
import Link from 'next/link'
import {notFound} from 'next/navigation'

import {useBookmarks} from '@/model/bookmarks'
import {googleMapsUrl, notionUrl} from '@/model/util'

import {useTRPC} from '@/lib/trpc'

import {MenuBarItem, MenuBarTray} from '@/components/views/menu-bar'
import {Section} from '@/components/views/section'
import {SectionHeader, SectionHeaderStack} from '@/components/views/section-header'
import {Splash} from '@/components/views/splash'
import {PageStack} from '@/components/views/stack'

export function PlacePageContent({id}: {id: string}) {
    const trpc = useTRPC()

    const {data: place} = useSuspenseQuery(trpc.GetPlace.queryOptions({id}))

    const {bookmarks, toggleBookmark} = useBookmarks()

    if (place === null) return notFound()

    const tags: string[] = [...place.type, ...place.tags]

    return (
        <>
            <Splash title={place.name} subtitle={place.city_name} image={place.image ?? undefined} />
            <PageStack padding>
                <SectionHeaderStack>
                    <Section>
                        {tags.length > 0 ? <p className="line-clamp-1 text-sm font-semibold uppercase opacity-60">{tags.join(' • ')}</p> : null}
                        {place.description ? <p>{place.description}</p> : null}
                    </Section>

                    <MenuBarTray>
                        <Link href={googleMapsUrl({name: place.name, city_name: place.city_name, maps_id: place.maps_id})} target="_blank">
                            <MenuBarItem>
                                <MapTrifoldIcon weight="bold" />
                                <p>Open in Google Maps</p>
                            </MenuBarItem>
                        </Link>
                        <Link href={notionUrl(place.id)} target="_blank">
                            <MenuBarItem>
                                <PencilIcon weight="bold" />
                                <p>Edit</p>
                            </MenuBarItem>
                        </Link>
                    </MenuBarTray>
                </SectionHeaderStack>

                <SectionHeaderStack>
                    <Section>
                        <SectionHeader title="Actions" />
                    </Section>

                    <MenuBarTray>
                        <button onClick={() => toggleBookmark(place.id)} className="active:opacity-60">
                            <MenuBarItem active={bookmarks.includes(place.id)}>
                                <HeartIcon weight={bookmarks.includes(place.id) ? 'fill' : 'bold'} />
                                <p>Bookmark</p>
                            </MenuBarItem>
                        </button>
                    </MenuBarTray>
                </SectionHeaderStack>
            </PageStack>
        </>
    )
}
