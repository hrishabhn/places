'use client'

import {CityCard} from './views/city/card'
import {PlaceCard} from './views/place/card'

import {ArrowCircleRight, MagnifyingGlass} from '@phosphor-icons/react'
import {useQuery} from '@tanstack/react-query'
import Link from 'next/link'

import {appDescription, appTitle} from '@/model/app'

import {useTRPC} from '@/lib/trpc'

import {Heading, robotoSlab} from '@/components/layout'
import {Loading} from '@/components/views/loading'
import {ScrollStack} from '@/components/views/scroll'
import {Section} from '@/components/views/section'
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
            <div className="flex w-full flex-col items-center justify-center gap-6 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa')] bg-cover bg-center px-4 py-12 text-center text-white sm:px-10 sm:py-20">
                <p className={`${robotoSlab.className} text-5xl font-bold sm:text-5xl md:text-6xl lg:text-7xl`}>{appTitle}</p>

                <p className="text-lg font-semibold opacity-80 md:text-xl">{appDescription}</p>

                <Link
                    href="/places?search=true"
                    className="mt-2 flex w-full max-w-72 items-center gap-2 rounded-full border border-g-500/50 bg-line/30 px-3 py-2 text-base font-medium text-white backdrop-blur-md active:opacity-60"
                >
                    <MagnifyingGlass weight="bold" />
                    <TypeWords text="Search for" words={['restaurants', 'bars', 'cafes', 'parks']} />
                </Link>
            </div>

            <Section>
                <Heading size="h2">Cities</Heading>
            </Section>
            <ScrollStack>
                {allCity.map(city => (
                    <CityCard key={city.slug} city={city} />
                ))}
                <ViewAll href="/cities" />
            </ScrollStack>

            <Section>
                <Heading size="h2">Recently Added</Heading>
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
