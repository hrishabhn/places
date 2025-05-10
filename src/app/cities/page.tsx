'use client'

import {Flag, MapPin, Plus, TextT, X} from '@phosphor-icons/react'
import {useQuery, useSuspenseQuery} from '@tanstack/react-query'
import {parseAsString, parseAsStringLiteral, useQueryState} from 'nuqs'

import {CityCard} from '@/app/views/city/card'

import {countryFlag} from '@/model/util'

import {useArrayState} from '@/lib/hooks/nuqs'
import {useTRPC} from '@/lib/trpc'

import {Heading} from '@/components/layout'
import {Badge, ButtonTray} from '@/components/ui'
import {type ActiveFilter, FilterBar} from '@/components/views/filter'
import {getIcon} from '@/components/views/get-icon'
import {GridStack} from '@/components/views/grid'
import {Loading} from '@/components/views/loading'
import {MenuBarSelect, MenuBarSort, MenuBarTray} from '@/components/views/menu-bar'
import {SearchBarFilter} from '@/components/views/search'
import {Section} from '@/components/views/section'

const allSort = ['place_count', 'country', 'name'] as const

export default function CitiesPage() {
    // state
    const selectedCountrySlug = useArrayState('country')

    const [query, setQuery] = useQueryState('q', parseAsString.withDefault(''))

    const [selectedSort, setSelectedSort] = useQueryState('sort', parseAsStringLiteral(allSort).withDefault('place_count'))

    // query
    const trpc = useTRPC()
    const {data: allCountry} = useSuspenseQuery(trpc.GetAllCountry.queryOptions({sort: 'city_count'}))

    const {status: searchStatus, data: searchResult} = useQuery(trpc.SearchCityFilter.queryOptions({query}))
    const {status: allCityStatus, data: allCity} = useQuery(
        trpc.GetAllCity.queryOptions({
            filter: {countrySlug: selectedCountrySlug.value},
            query,
            sort: selectedSort,
        })
    )

    // derived state
    const isPending = searchStatus === 'pending' || allCityStatus === 'pending'
    const isError = searchStatus === 'error' || allCityStatus === 'error'

    if (isError) throw new Error('Failed to load data')

    // active filter
    const activeFilter: ActiveFilter[] = [
        ...selectedCountrySlug.value.map(countrySlug => ({
            title: allCountry.find(country => country.slug === countrySlug)?.name || countrySlug,
            type: 'country' as const,
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
                    toImage={country => ({imageURL: countryFlag(country.code)})}
                    toTitle={country => country.name}
                    toSubtitle={country => `${country.city_count} cities`}
                />

                <div className="grow" />

                <MenuBarSort
                    selectedSort={selectedSort}
                    allSort={allSort}
                    onSelect={option => setSelectedSort(option)}
                    toIcon={option =>
                        ({
                            place_count: MapPin,
                            country: Flag,
                            name: TextT,
                        })[option]
                    }
                    toTitle={option =>
                        ({
                            place_count: 'Place Count',
                            country: 'Country',
                            name: 'Name',
                        })[option]
                    }
                />
            </MenuBarTray>

            {activeFilter.length > 0 && (
                <FilterBar>
                    {activeFilter.map(filter => {
                        const Icon = getIcon(filter.type)
                        return (
                            <button key={filter.title} className="active:opacity-60" onClick={() => filter.onRemove()}>
                                <Badge>
                                    <Icon weight="duotone" />
                                    <p>{filter.title}</p>
                                    <X weight="bold" />
                                </Badge>
                            </button>
                        )
                    })}
                </FilterBar>
            )}

            <Section>
                <div className="pb-4 pt-8">
                    <SearchBarFilter query={query} setQuery={setQuery} />
                </div>

                {isPending ? (
                    <Loading />
                ) : (
                    <>
                        {searchResult.length > 0 && (
                            <>
                                <Heading size="h2">Filters</Heading>
                                <ButtonTray>
                                    {searchResult.map((result, i) => {
                                        const active = {
                                            country: selectedCountrySlug.value.includes(result.id),
                                        }[result.type]

                                        const onSelect = {
                                            country: () => selectedCountrySlug.toggle(result.id),
                                        }[result.type]

                                        const Icon = getIcon(result.type)

                                        return (
                                            <button
                                                key={i}
                                                className="active:opacity-60"
                                                onClick={() => {
                                                    onSelect()
                                                    setQuery('')
                                                }}
                                            >
                                                <Badge active={active}>
                                                    <Icon weight="duotone" />
                                                    <p>{result.name}</p>
                                                    {active ? <X weight="bold" /> : <Plus weight="bold" />}
                                                </Badge>
                                            </button>
                                        )
                                    })}
                                </ButtonTray>
                            </>
                        )}

                        <Heading size="h2">Cities</Heading>
                        {allCity.length > 0 ? (
                            <GridStack>
                                {allCity.map(city => (
                                    <CityCard key={city.slug} city={city} />
                                ))}
                            </GridStack>
                        ) : (
                            <>
                                <Heading size="h4" withoutPadding>
                                    No results
                                </Heading>
                                <Heading size="h5" withoutPadding>
                                    Try adjusting the filters
                                </Heading>
                            </>
                        )}
                    </>
                )}
            </Section>
        </>
    )
}
