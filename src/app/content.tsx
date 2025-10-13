'use client'

import {CityCard} from './views/city/card'
import {PlaceCard} from './views/place/card'

import {ArrowRightIcon} from '@phosphor-icons/react'
import {keepPreviousData, useQuery} from '@tanstack/react-query'
import Link from 'next/link'

import {type City, type Place} from '@/server/types'

import {type Bookmarks, getBookmarks} from '@/model/bookmarks'
import {setsEqual} from '@/model/util'

import {useTRPC} from '@/lib/trpc'

import {Heading} from '@/components/layout'
import {Button} from '@/components/ui'
import {HLine} from '@/components/views/h-line'
import {ScrollStack} from '@/components/views/scroll'
import {Section} from '@/components/views/section'

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

    const {data: bookmarks} = useQuery({
        queryKey: ['bookmarks'],
        queryFn: async () => await getBookmarks(),
        initialData: initialBookmarks,
    })

    // const {mutate: toggle} = useMutation({mutationFn: async (id: string) => await queryClient.setQueryData(['bookmarks'], await toggleBookmark(id))})

    const {data: allCity} = useQuery(trpc.GetAllCity.queryOptions({sort: 'place_count', limit: 5}, {initialData: initialAllCity}))
    const {data: allPlaceNew} = useQuery(trpc.GetAllPlace.queryOptions({sort: 'first_visit', limit: 5}, {initialData: initialAllPlaceNew}))
    const {data: allPlaceRandom} = useQuery(trpc.GetAllPlace.queryOptions({sort: 'random', limit: 5}, {initialData: initialAllPlaceRandom}))

    return (
        <>
            {bookmarks.length > 0 && <HomeContentBookmark bookmarks={bookmarks} initialAllPlaceBookmark={initialAllPlaceBookmark} />}

            <Section>
                <SectionHeader title="Top Cities" subtitle="Most popular cities" href="/cities" />
            </Section>
            <ScrollStack>
                {allCity.map(city => (
                    <CityCard key={city.slug} city={city} />
                ))}
            </ScrollStack>

            <Section>
                <SectionHeader title="Recently Added" subtitle="New additions to the collection" href="/places" />
            </Section>
            <ScrollStack>
                {allPlaceNew.map(place => (
                    <PlaceCard key={place.id} place={place} />
                ))}
            </ScrollStack>

            <Section>
                <SectionHeader title="Random Picks" subtitle="Discover hidden gems" href="/places" />
            </Section>
            <ScrollStack>
                {allPlaceRandom.map(place => (
                    <PlaceCard key={place.id} place={place} />
                ))}
            </ScrollStack>
        </>
    )
}

function HomeContentBookmark({bookmarks, initialAllPlaceBookmark}: {bookmarks: Bookmarks; initialAllPlaceBookmark: Place[]}) {
    const trpc = useTRPC()

    // const {mutate: toggle} = useMutation({mutationFn: async (id: string) => await queryClient.setQueryData(['bookmarks'], await toggleBookmark(id))})

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
                <SectionHeader title="Your Bookmarks" subtitle="Saved places" href="/places?bookmarks=true" />
            </Section>
            <ScrollStack>
                {allPlaceBookmark.map(place => (
                    <PlaceCard key={place.id} place={place} />
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

type SectionHeaderProps = {
    title: string
    subtitle?: string
    href: string
}

function SectionHeader({title, subtitle, href}: SectionHeaderProps) {
    return (
        <>
            <div className="pt-12">
                <HLine />
                <Link href={href} className="group flex w-full items-center py-2 hover:underline">
                    <div>
                        <Heading size="h2" serif withoutPadding>
                            {title}
                        </Heading>
                        <p className="line-clamp-1 font-medium opacity-80">{subtitle}</p>
                    </div>

                    <div className="grow" />

                    <ArrowRightIcon weight="bold" className="text-xl opacity-0 transition group-hover:opacity-100" />
                </Link>
            </div>
        </>
    )
}
