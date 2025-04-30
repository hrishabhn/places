'use client'

import {Flag, X} from '@phosphor-icons/react'
import {useSuspenseQuery} from '@tanstack/react-query'
import Link from 'next/link'
import {Suspense} from 'react'

import {CityCard} from '@/app/views/city/card'

import {countryFlag} from '@/model/util'

import {useArrayState} from '@/lib/hooks/array-state'
import {useTRPC} from '@/lib/trpc'

import {Heading} from '@/components/layout'
import {Badge} from '@/components/ui'
import {GridStack} from '@/components/views/grid'
import {HomeInfoItem, HomeInfoTray} from '@/components/views/info'
import {Loading} from '@/components/views/loading'
import {Section} from '@/components/views/section'

export default function CitiesPage() {
    const selectedCountrySlug = useArrayState('country')

    const trpc = useTRPC()
    const {data: allCountry} = useSuspenseQuery(trpc.GetAllCountry.queryOptions({sort: 'city_count'}))

    return (
        <>
            <HomeInfoTray>
                {selectedCountrySlug.value.map(countrySlug => (
                    <button key={countrySlug} className="active:opacity-60" onClick={() => selectedCountrySlug.remove(countrySlug)}>
                        <Badge active>
                            <X weight="bold" />
                            <p>{allCountry.find(country => country.slug === countrySlug)?.name || countrySlug}</p>
                        </Badge>
                    </button>
                ))}
                <HomeInfoItem
                    icon={Flag}
                    placeholder="Country"
                    allItem={allCountry}
                    onSelect={country => selectedCountrySlug.toggle(country.slug)}
                    isActive={country => selectedCountrySlug.value.includes(country.slug)}
                    toId={country => country.slug}
                    toImage={country => ({imageURL: countryFlag(country.slug)})}
                    toTitle={country => country.name}
                    toSubtitle={country => `${country.city_count} cities`}
                />
            </HomeInfoTray>

            <Section>
                <Suspense fallback={<Loading />}>
                    <CitiesStack filter={{countrySlug: selectedCountrySlug.value}} />
                </Suspense>
            </Section>
        </>
    )
}

type CitiesStackProps = {
    filter: {
        countrySlug: string[]
    }
}

function CitiesStack({filter}: CitiesStackProps) {
    const trpc = useTRPC()
    const {data: allCity} = useSuspenseQuery(trpc.GetAllCity.queryOptions({sort: 'place_count', filter}))

    if (allCity.length === 0)
        return (
            <div className="py-3">
                <Heading size="h3" withoutPadding>
                    No results
                </Heading>
                <Heading size="h5" withoutPadding>
                    Try adjusting the filters
                </Heading>
            </div>
        )

    return (
        <>
            <p className="py-3">{allCity.length} cities</p>
            <GridStack>
                {allCity.map(city => (
                    <Link key={city.slug} href={`/places?city=${city.slug}`} className="active:opacity-60">
                        <CityCard city={city} />
                    </Link>
                ))}
            </GridStack>
        </>
    )
}
