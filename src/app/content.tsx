'use client'

import {CityCard} from './views/city/card'
import {PlaceCard} from './views/place/card'

import {ArrowRightIcon} from '@phosphor-icons/react'
import {keepPreviousData, useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import Link from 'next/link'

import {type City, type Place} from '@/server/types'

import {type Bookmarks, getBookmarks, toggleBookmark} from '@/model/bookmarks'
import {setsEqual} from '@/model/util'

import {useTRPC} from '@/lib/trpc'

import {Button} from '@/components/ui'
import {ScrollStack} from '@/components/views/scroll'
import {Section, SectionHeader} from '@/components/views/section'

export default function HomeContent({
    initialBookmarks,
    initialAllPlaceBookmark,
    initialAllCity,
    initialAllPlaceNew,
    initialAllPlaceRandom,
}: {
    initialBookmarks: Bookmarks
    initialAllPlaceBookmark: Place[]
    initialAllCity: City[]
    initialAllPlaceNew: Place[]
    initialAllPlaceRandom: Place[]
}) {
    // query
    const trpc = useTRPC()
    const queryClient = useQueryClient()

    const {data: bookmarks} = useQuery({
        queryKey: ['bookmarks'],
        queryFn: async () => await getBookmarks(),
        initialData: initialBookmarks,
    })

    const {mutate: toggle} = useMutation({mutationFn: async (id: string) => await queryClient.setQueryData(['bookmarks'], await toggleBookmark(id))})

    const {data: allCity} = useQuery(trpc.GetAllCity.queryOptions({sort: 'place_count', limit: 5}, {initialData: initialAllCity}))
    const {data: allPlaceNew} = useQuery(trpc.GetAllPlace.queryOptions({sort: 'created', limit: 5}, {initialData: initialAllPlaceNew}))
    const {data: allPlaceRandom} = useQuery(trpc.GetAllPlace.queryOptions({sort: 'random', limit: 5}, {initialData: initialAllPlaceRandom}))

    return (
        <>
            {bookmarks.length > 0 && <HomeContentBookmark bookmarks={bookmarks} initialAllPlaceBookmark={initialAllPlaceBookmark} />}

            <Section>
                <SectionHeader title="Top Cities" subtitle="Most popular cities">
                    <ViewAll href="/cities" />
                </SectionHeader>
            </Section>
            <ScrollStack>
                {allCity.map(city => (
                    <CityCard key={city.slug} city={city} />
                ))}
            </ScrollStack>

            <Section>
                <SectionHeader title="Recently Added" subtitle="New additions to the collection">
                    <ViewAll href="/places" />
                </SectionHeader>
            </Section>
            <ScrollStack>
                {allPlaceNew.map(place => (
                    <PlaceCard key={place.id} place={place} bookmark={bookmarks.includes(place.id)} onBookmark={() => toggle(place.id)} />
                ))}
            </ScrollStack>

            <Section>
                <SectionHeader title="Random Picks" subtitle="Discover hidden gems">
                    <ViewAll href="/places" />
                </SectionHeader>
            </Section>
            <ScrollStack>
                {allPlaceRandom.map(place => (
                    <PlaceCard key={place.id} place={place} bookmark={bookmarks.includes(place.id)} onBookmark={() => toggle(place.id)} />
                ))}
            </ScrollStack>
        </>
    )
}

function HomeContentBookmark({bookmarks, initialAllPlaceBookmark}: {bookmarks: Bookmarks; initialAllPlaceBookmark: Place[]}) {
    const trpc = useTRPC()
    const queryClient = useQueryClient()

    const {mutate: toggle} = useMutation({mutationFn: async (id: string) => await queryClient.setQueryData(['bookmarks'], await toggleBookmark(id))})

    const {data: allPlaceBookmark} = useQuery(
        trpc.GetAllPlace.queryOptions(
            {filter: {id: bookmarks}, sort: 'name'},
            {
                initialData: () => {
                    if (setsEqual(new Set(initialAllPlaceBookmark.map(place => place.id)), new Set(bookmarks))) return initialAllPlaceBookmark
                },
                placeholderData: keepPreviousData,
            }
        )
    )

    if (allPlaceBookmark === undefined) return null
    return (
        <>
            <Section>
                <SectionHeader title="Your Bookmarks" subtitle="Saved places">
                    <ViewAll href="/places?bookmarks=true" />
                </SectionHeader>
            </Section>
            <ScrollStack>
                {allPlaceBookmark.map(place => (
                    <PlaceCard key={place.id} place={place} bookmark={bookmarks.includes(place.id)} onBookmark={() => toggle(place.id)} />
                ))}
            </ScrollStack>
        </>
    )
}

export function ViewAll({href}: {href: string}) {
    return (
        <Link href={href} className="flex items-center gap-2 rounded-xl active:opacity-60">
            <Button theme="layer-1" ring>
                <p>View All</p>
                <ArrowRightIcon weight="bold" />
            </Button>
        </Link>
    )
}
