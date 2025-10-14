'use client'

import {CityListItem} from '../views/city/list-item'
import {SectionHeader} from './section-header'

import {useSuspenseQuery} from '@tanstack/react-query'

import {useTRPC} from '@/lib/trpc'

import {ListGrid} from '@/components/views/list'
import {Section} from '@/components/views/section'

export function HomeContentCities() {
    const trpc = useTRPC()

    const {data: allCity} = useSuspenseQuery(trpc.GetAllCity.queryOptions({sort: 'place_count', limit: 6}))

    return (
        <Section>
            <SectionHeader title="Top Cities" href="/cities" />
            <ListGrid>
                {allCity.map(city => (
                    <CityListItem key={city.slug} city={city} />
                ))}
            </ListGrid>
        </Section>
    )
}
