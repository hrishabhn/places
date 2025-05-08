'use client'

import {CityCard} from './views/city/card'
import {PlaceCard} from './views/place/card'

import {ArrowRight, MagnifyingGlass} from '@phosphor-icons/react'
import {useQuery} from '@tanstack/react-query'
import Link from 'next/link'

import {appDescription, appSubtitle} from '@/model/app'

import {useTRPC} from '@/lib/trpc'

import {Heading} from '@/components/layout'
import {Button} from '@/components/ui'
import {Loading} from '@/components/views/loading'
import {ScrollStack} from '@/components/views/scroll'
import {Section} from '@/components/views/section'

const backdrop = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa'

export default function Home() {
    const trpc = useTRPC()
    const {status: allCityStatus, data: allCity} = useQuery(trpc.GetAllCity.queryOptions({sort: 'place_count', limit: 5}))
    const {status: allPlaceNewStatus, data: allPlaceNew} = useQuery(trpc.GetAllPlace.queryOptions({sort: 'created', limit: 5}))
    const {status: allPlaceRandomStatus, data: allPlaceRandom} = useQuery(trpc.GetAllPlace.queryOptions({sort: 'random', limit: 5}, {staleTime: 0}))

    if (allCityStatus === 'pending' || allPlaceNewStatus === 'pending' || allPlaceRandomStatus === 'pending') return <Loading />
    if (allCityStatus === 'error' || allPlaceNewStatus === 'error' || allPlaceRandomStatus === 'error') throw new Error('Failed to load data')

    return (
        <>
            <div className="relative bg-layer-0-dark text-white">
                <div style={{backgroundImage: `url(${backdrop})`}} className="absolute inset-0 bg-cover bg-center opacity-50" />

                <div className="relative flex w-full flex-col items-center justify-center gap-6 px-10 py-48 text-center sm:py-64">
                    <p className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">{appSubtitle}</p>
                    <p className="text-lg font-medium md:text-xl">{appDescription}</p>

                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link href="/places" className="flex items-center gap-4 rounded-xl bg-accent-dark px-3.5 py-2.5 font-medium active:opacity-60">
                            <p>Explore Places</p>
                            <ArrowRight weight="bold" />
                        </Link>
                        <Link
                            href="/search"
                            className="flex items-center gap-2 rounded-xl border border-g-500/50 bg-g-500/30 px-3.5 py-2.5 font-medium backdrop-blur-md active:opacity-60"
                        >
                            <MagnifyingGlass weight="bold" />
                            <p>Search</p>
                        </Link>
                    </div>
                </div>
            </div>

            <SectionHeader title="Cities" subtitle="Most popular cities" viewAll="/cities" />
            <ScrollStack>
                {allCity.map(city => (
                    <CityCard key={city.slug} city={city} />
                ))}
            </ScrollStack>

            <SectionHeader title="Recently Added" subtitle="New additions to the collection" viewAll="/places" />
            <ScrollStack>
                {allPlaceNew.map(place => (
                    <PlaceCard key={place.id} place={place} />
                ))}
            </ScrollStack>

            <SectionHeader title="Random Picks" subtitle="Discover hidden gems" viewAll="/places" />
            <ScrollStack>
                {allPlaceRandom.map(place => (
                    <PlaceCard key={place.id} place={place} />
                ))}
            </ScrollStack>
        </>
    )
}

function SectionHeader({title, subtitle, viewAll}: {title: string; subtitle: string; viewAll: string}) {
    return (
        <Section>
            <div className="flex w-full items-end pb-4 pt-10">
                <div>
                    <Heading size="h2" withoutPadding>
                        {title}
                    </Heading>
                    <p className="font-medium opacity-80">{subtitle}</p>
                </div>

                <div className="grow" />

                <Link href={viewAll} className="flex items-center gap-2 rounded-xl">
                    <Button theme="layer-1" ring>
                        <p>View All</p>
                        <ArrowRight weight="bold" />
                    </Button>
                </Link>
            </div>
        </Section>
    )
}
