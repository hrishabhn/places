'use client'

import {Flag, X} from '@phosphor-icons/react'
import {useQuery} from '@tanstack/react-query'
import Link from 'next/link'

import {CityCard} from '@/app/views/city/card'

import {countryFlag} from '@/model/util'

import {useArrayState} from '@/lib/hooks/array-state'
import {useTRPC} from '@/lib/trpc'

import {Badge, Callout} from '@/components/ui'
import {GridStack} from '@/components/views/grid'
import {HomeInfoItem, HomeInfoTray} from '@/components/views/info'
import {Loading} from '@/components/views/loading'
import {Section} from '@/components/views/section'

export default function CitiesPage() {
    const selectedCountrySlug = useArrayState('country')

    const trpc = useTRPC()
    const {status: allCountryStatus, data: allCountry} = useQuery(trpc.GetAllCountry.queryOptions({sort: 'city_count'}))
    const {status: allCityStatus, data: allCity} = useQuery(trpc.GetAllCity.queryOptions({sort: 'place_count', filter: {countrySlug: selectedCountrySlug.value}}))

    if (allCountryStatus === 'pending') return <Loading />
    if (allCountryStatus === 'error' || allCityStatus === 'error') return <Callout theme="error" message="Error loading data" />

    return (
        <Section>
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

                <div className="grow" />
                {allCityStatus === 'success' && <Badge active>{allCity.length} cities</Badge>}
            </HomeInfoTray>

            {allCityStatus === 'pending' ? (
                <Loading />
            ) : (
                <GridStack>
                    {allCity.map(city => (
                        <Link key={city.slug} href={`/cities/${city.slug}`} className="active:opacity-60">
                            <CityCard city={city} />
                        </Link>
                    ))}
                </GridStack>
            )}
        </Section>
    )
}
