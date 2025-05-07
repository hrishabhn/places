'use client'

import {CityCard} from './views/city/card'
import {PlaceCard} from './views/place/card'

import {ArrowCircleRight, MagnifyingGlass} from '@phosphor-icons/react'
import {useQuery} from '@tanstack/react-query'
import Link from 'next/link'

import {useTRPC} from '@/lib/trpc'

import {Heading, robotoSlab} from '@/components/layout'
import {Card} from '@/components/ui'
import {Loading} from '@/components/views/loading'
import {ScrollStack} from '@/components/views/scroll'
import {Section} from '@/components/views/section'
import {Splash} from '@/components/views/splash'
import {TypeWords} from '@/components/views/type-words'

export default function Home() {
    const trpc = useTRPC()
    const {status: allCityStatus, data: allCity} = useQuery(trpc.GetAllCity.queryOptions({sort: 'place_count', limit: 5}))
    const {status: allPlaceNewStatus, data: allPlaceNew} = useQuery(trpc.GetAllPlace.queryOptions({sort: 'created', limit: 5}))
    const {status: allPlaceRandomStatus, data: allPlaceRandom} = useQuery(trpc.GetAllPlace.queryOptions({sort: 'random', limit: 5}, {staleTime: 0}))

    if (allCityStatus === 'pending' || allPlaceNewStatus === 'pending' || allPlaceRandomStatus === 'pending') return <Loading />
    if (allCityStatus === 'error' || allPlaceNewStatus === 'error' || allPlaceRandomStatus === 'error') throw new Error('Failed to load data')

    return (
        <>
            <Splash url="https://images.unsplash.com/photo-1451187580459-43490279c0fa">
                <div className={`${robotoSlab.className}`}>
                    <Heading size="h2">Travel Guide</Heading>
                    <p className="mb-2 font-medium opacity-60">Discover the best places to visit</p>

                    <Link
                        href="/places?search=true"
                        className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-medium text-black backdrop-blur-lg active:opacity-60"
                    >
                        <MagnifyingGlass weight="bold" />
                        <TypeWords text="Search for" words={['restaurants', 'bars', 'cafes', 'parks']} />
                    </Link>
                </div>
            </Splash>

            <Section>
                <Heading size="h2">Cities</Heading>
            </Section>
            <ScrollStack>
                {allCity.map(city => (
                    <CityCard key={city.slug} city={city} />
                ))}
                <Card rounded="md" ring>
                    <Link href="/cities" className="flex size-full flex-col active:opacity-60">
                        <div className="flex size-full flex-col items-center justify-center">
                            <ArrowCircleRight weight="duotone" size={32} className="text-accent dark:text-accent-dark" />
                            <p className="text-accent dark:text-accent-dark">View All</p>
                        </div>
                    </Link>
                </Card>
                <ViewAll href="/cities" />
            </ScrollStack>

            <Section>
                <Heading size="h2">New Places</Heading>
            </Section>
            <ScrollStack>
                {allPlaceNew.map(place => (
                    <PlaceCard key={place.id} place={place} />
                ))}
                <ViewAll href="/places" />
            </ScrollStack>

            <Section>
                <Heading size="h2">Random Picks</Heading>
            </Section>
            <ScrollStack>
                {allPlaceRandom.map(place => (
                    <PlaceCard key={place.id} place={place} />
                ))}
                <ViewAll href="/places" />
            </ScrollStack>
        </>
    )
}

function ViewAll({href}: {href: string}) {
    return (
        <Link
            href={href}
            className="flex size-full flex-col items-center justify-center rounded-md bg-layer-1 text-accent ring-1 ring-line active:opacity-60 dark:bg-layer-1-dark dark:text-accent-dark dark:ring-line-dark"
        >
            <ArrowCircleRight weight="duotone" size={32} />
            <Heading size="h4" withoutPadding>
                View All
            </Heading>
        </Link>
    )
}
