'use client'

import {HeartIcon, MapTrifoldIcon, PencilIcon} from '@phosphor-icons/react'
import {useMutation, useQueryClient, useSuspenseQuery} from '@tanstack/react-query'
import Link from 'next/link'
import {notFound} from 'next/navigation'

import {getBookmarks, toggleBookmark} from '@/model/bookmarks'
import {googleMapsUrl, notionUrl} from '@/model/util'

import {useTRPC} from '@/lib/trpc'

import {Heading} from '@/components/layout'
import {MenuBarItem, MenuBarTray} from '@/components/views/menu-bar'
import {Section} from '@/components/views/section'
import {Splash} from '@/components/views/splash'
import {PageStack} from '@/components/views/stack'

export function PlacePageContent({id}: {id: string}) {
    const trpc = useTRPC()
    const queryClient = useQueryClient()

    const {data: place} = useSuspenseQuery(trpc.GetPlace.queryOptions({id}))

    const {data: bookmarks} = useSuspenseQuery({
        queryKey: ['bookmarks'],
        queryFn: async () => await getBookmarks(),
    })
    const {mutate: toggle} = useMutation({mutationFn: async (id: string) => await queryClient.setQueryData(['bookmarks'], await toggleBookmark(id))})

    if (place === null) return notFound()

    return (
        <PageStack>
            <Splash title={place.name} subtitle={place.city_name} description={place.description ?? undefined} image={place.image ?? undefined} />

            <Section>
                <Heading size="h2" serif>
                    Links
                </Heading>
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

            <Section>
                <Heading size="h2" serif>
                    Actions
                </Heading>
            </Section>
            <MenuBarTray>
                <button onClick={() => toggle(place.id)} className="active:opacity-60">
                    <MenuBarItem active={bookmarks.includes(place.id)}>
                        <HeartIcon weight={bookmarks.includes(place.id) ? 'fill' : 'bold'} />
                        <p>Bookmark</p>
                    </MenuBarItem>
                </button>
            </MenuBarTray>
        </PageStack>
    )
}
