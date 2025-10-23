'use client'

import {ArrowsDownUpIcon, CardsThreeIcon, FlagIcon, type Icon, MapPinIcon, PlusIcon, SquaresFourIcon, TextTIcon, XIcon} from '@phosphor-icons/react'
import {useQuery, useSuspenseQuery} from '@tanstack/react-query'
import {parseAsString, parseAsStringLiteral, useQueryState} from 'nuqs'

import {CityCard} from '@/app/views/city/card'
import {CityListItem} from '@/app/views/city/list-item'

import {type City, type Country} from '@/server/db/types'

import {countryFlag} from '@/model/util'

import {useArrayState} from '@/lib/hooks/nuqs'
import {useTRPC} from '@/lib/trpc'

import {type ActiveFilter} from '@/components/views/filter'
import {getIcon} from '@/components/views/get-icon'
import {GridStack} from '@/components/views/grid'
import {ListGridStack} from '@/components/views/list'
import {MenuBarItem, MenuBarSelect, MenuBarTray} from '@/components/views/menu-bar'
import {NoResults} from '@/components/views/no-results'
import {SearchBarFilter} from '@/components/views/search'
import {Section} from '@/components/views/section'
import {PageStack} from '@/components/views/stack'
import {ErrorView, LoadingView} from '@/components/views/state'

const allSort = ['place_count', 'country', 'name'] as const
type Sort = (typeof allSort)[number]

const sortTitle: Record<Sort, string> = {
    place_count: 'Place Count',
    country: 'Country',
    name: 'Name',
}

const sortIcon: Record<Sort, Icon> = {
    place_count: MapPinIcon,
    country: FlagIcon,
    name: TextTIcon,
}

const allView = ['list', 'grid'] as const
type View = (typeof allView)[number]

const viewTitle: Record<View, string> = {
    list: 'List',
    grid: 'Grid',
}

const viewIcon: Record<View, Icon> = {
    list: CardsThreeIcon,
    grid: SquaresFourIcon,
}

export default function CitiesPage() {
    // state
    const selectedCountrySlug = useArrayState('country')

    const [query, setQuery] = useQueryState('q', parseAsString.withDefault(''))

    const [selectedSort, setSelectedSort] = useQueryState('sort', parseAsStringLiteral(allSort).withDefault(allSort[0]))
    const [selectedView, setSelectedView] = useQueryState('view', parseAsStringLiteral(allView).withDefault(allView[0]))

    // query
    const trpc = useTRPC()

    const {data: allCountry} = useSuspenseQuery(trpc.country.getAll.queryOptions({sort: 'city_count'}))

    const {status: searchStatus, data: searchResult} = useQuery(trpc.search.cityFilter.queryOptions({query}))
    const {status: allCityStatus, data: allCity} = useQuery(
        trpc.city.getAll.queryOptions({
            filter: {countrySlug: selectedCountrySlug.value},
            query,
            sort: selectedSort,
        })
    )

    // derived state
    const isPending = searchStatus === 'pending' || allCityStatus === 'pending'
    const isError = searchStatus === 'error' || allCityStatus === 'error'

    if (isError) return <ErrorView />

    // active filter
    const activeFilter: ActiveFilter[] = [
        ...selectedCountrySlug.value.map(countrySlug => ({
            title: allCountry.find(country => country.slug === countrySlug)?.name || countrySlug,
            type: 'country' as const,
            onRemove: () => selectedCountrySlug.remove(countrySlug),
        })),
    ]

    return (
        <PageStack>
            <MenuBarTray>
                {activeFilter.map(filter => {
                    const Icon = getIcon(filter.type)
                    return (
                        <button key={filter.title} className="active:opacity-60" onClick={() => filter.onRemove()}>
                            <MenuBarItem active>
                                <Icon weight="duotone" />
                                <p>{filter.title}</p>
                                <XIcon weight="bold" />
                            </MenuBarItem>
                        </button>
                    )
                })}

                <MenuBarSelect<Country>
                    icon={FlagIcon}
                    text="Country"
                    active={selectedCountrySlug.value.length > 0}
                    allItem={allCountry}
                    onSelect={country => selectedCountrySlug.toggle(country.slug)}
                    isActive={country => selectedCountrySlug.value.includes(country.slug)}
                    toId={country => country.slug}
                    toImage={country => ({imageURL: countryFlag(country.code)})}
                    toTitle={country => country.name}
                    toSubtitle={country => `${country.city_count} cities`}
                />

                <div className="grow" />

                <MenuBarSelect<Sort>
                    icon={ArrowsDownUpIcon}
                    text={sortTitle[selectedSort]}
                    anchor="bottom end"
                    allItem={[...allSort]}
                    onSelect={option => setSelectedSort(option)}
                    isActive={option => option === selectedSort}
                    toId={option => option}
                    toImage={option => ({icon: sortIcon[option]})}
                    toTitle={option => sortTitle[option]}
                />

                <MenuBarSelect<View>
                    icon={CardsThreeIcon}
                    text={viewTitle[selectedView]}
                    anchor="bottom end"
                    allItem={[...allView]}
                    onSelect={view => setSelectedView(view)}
                    isActive={view => view === selectedView}
                    toId={view => view}
                    toImage={view => ({icon: viewIcon[view]})}
                    toTitle={view => viewTitle[view]}
                />
            </MenuBarTray>

            <SearchBarFilter query={query} setQuery={setQuery} resultCount={allCity?.length} />

            {isPending ? (
                <LoadingView />
            ) : (
                <>
                    {searchResult.length > 0 && (
                        <MenuBarTray>
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
                                        <MenuBarItem active={active}>
                                            <Icon weight="duotone" />
                                            <p>{result.name}</p>
                                            {active ? <XIcon weight="bold" /> : <PlusIcon weight="bold" />}
                                        </MenuBarItem>
                                    </button>
                                )
                            })}
                        </MenuBarTray>
                    )}

                    <CitiesStack allCity={allCity} view={selectedView} />
                </>
            )}
        </PageStack>
    )
}

function CitiesStack({allCity, view}: {allCity: City[]; view: View}) {
    if (allCity.length === 0) return <NoResults title="No cities found" subtitle="Try changing your query" />
    switch (view) {
        case 'list':
            return (
                <Section>
                    <GridStack>
                        {allCity.map(city => (
                            <CityCard key={city.slug} city={city} />
                        ))}
                    </GridStack>
                </Section>
            )
        case 'grid':
            return (
                <Section>
                    <ListGridStack>
                        {allCity.map(city => (
                            <CityListItem key={city.slug} city={city} />
                        ))}
                    </ListGridStack>
                </Section>
            )
    }
}
