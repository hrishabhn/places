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
import {type ActiveFilter, FilterBar, InfoBar} from '@/components/views/filter'
import {GridStack} from '@/components/views/grid'
import {Loading} from '@/components/views/loading'
import {MenuBarSelect, MenuBarTray} from '@/components/views/menu-bar'
import {Section} from '@/components/views/section'

export default function CitiesPage() {
    // state
    const selectedCountrySlug = useArrayState('country')

    // query
    const trpc = useTRPC()
    const {data: allCountry} = useSuspenseQuery(trpc.GetAllCountry.queryOptions({sort: 'city_count'}))

    // active filter
    const activeFilter: ActiveFilter[] = [
        ...selectedCountrySlug.value.map(countrySlug => ({
            title: allCountry.find(country => country.slug === countrySlug)?.name || countrySlug,
            onRemove: () => selectedCountrySlug.remove(countrySlug),
        })),
    ]

    return (
        <>
            <MenuBarTray>
                <MenuBarSelect
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
            </MenuBarTray>

            {activeFilter.length > 0 && (
                <FilterBar>
                    {activeFilter.map(filter => (
                        <button key={filter.title} className="active:opacity-60" onClick={() => filter.onRemove()}>
                            <Badge>
                                <X weight="bold" />
                                <p>{filter.title}</p>
                            </Badge>
                        </button>
                    ))}
                </FilterBar>
            )}

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
            <InfoBar>
                <p>{allCity.length} cities</p>
            </InfoBar>
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
