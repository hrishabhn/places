'use client'

import {HomeContentBookmarks} from './bookmarks'
import {HomeContentCities} from './cities'
import {HomeContentPlaces} from './places'

import {useQuery} from '@tanstack/react-query'
import Link from 'next/link'
import {parseAsString, useQueryState} from 'nuqs'

import {useTRPC} from '@/lib/trpc'

import {getIcon} from '@/components/views/get-icon'
import {ListGridStack, ListItem, ListItemIcon} from '@/components/views/list'
import {NoResults} from '@/components/views/no-results'
import {SearchBarFilter} from '@/components/views/search'
import {Section} from '@/components/views/section'
import {SectionHeader, SectionHeaderStack} from '@/components/views/section-header'
import {ErrorView, LoadingView} from '@/components/views/state'

export function HomeContent() {
    // state
    const [query, setQuery] = useQueryState('q', parseAsString.withDefault(''))

    return (
        <>
            <SearchBarFilter query={query} setQuery={setQuery} />

            {query.length > 0 ? (
                <Section>
                    <Search query={query} />
                </Section>
            ) : (
                <>
                    <HomeContentBookmarks />

                    <SectionHeaderStack>
                        <Section>
                            <SectionHeader title="Cities" href="/cities" />
                        </Section>
                        <HomeContentCities />
                    </SectionHeaderStack>

                    <SectionHeaderStack>
                        <Section>
                            <SectionHeader title="Suggested Places" href="/places" />
                        </Section>
                        <HomeContentPlaces />
                    </SectionHeaderStack>
                </>
            )}
        </>
    )
}

function Search({query}: {query: string}) {
    const trpc = useTRPC()

    const {status: searchStatus, data: searchResult} = useQuery(trpc.SearchAll.queryOptions({query}))

    if (searchStatus === 'pending') return <LoadingView />
    if (searchStatus === 'error') return <ErrorView />

    if (searchResult.length === 0) return <NoResults title="No results found" subtitle="Try changing your query" />

    return (
        <ListGridStack>
            {searchResult.map((result, i) => {
                return (
                    <Link
                        key={i}
                        href={
                            {
                                country: {pathname: '/places', query: {country: result.id}},
                                city: {pathname: '/places', query: {city: result.id}},
                                place: `/places/${result.id}`,
                                place_type: {pathname: '/places', query: {type: result.id}},
                                place_tag: {pathname: '/places', query: {tag: result.id}},
                            }[result.type]
                        }
                    >
                        <ListItem
                            image={<ListItemIcon icon={getIcon(result.type)} />}
                            title={result.name}
                            subtitle={
                                {
                                    country: 'Country',
                                    city: 'City',
                                    place: 'Place',
                                    place_type: 'Place Type',
                                    place_tag: 'Place Tag',
                                }[result.type]
                            }
                        />
                    </Link>
                )
            })}
        </ListGridStack>
    )
}
