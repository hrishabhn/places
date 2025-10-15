'use client'

import {CityListItem} from '../views/city/list-item'

import {useSuspenseQuery} from '@tanstack/react-query'

import {useTRPC} from '@/lib/trpc'

import {ListScrollStack} from '@/components/views/list'
import {Section} from '@/components/views/section'
import {SectionHeader, SectionHeaderStack} from '@/components/views/section-header'

export function HomeContentCities() {
    const trpc = useTRPC()

    const {data: allCity} = useSuspenseQuery(trpc.GetAllCity.queryOptions({sort: 'place_count'}))

    return (
        <SectionHeaderStack>
            <Section>
                <SectionHeader title="Cities" href="/cities" />
            </Section>
            <ListScrollStack>
                {allCity.map(city => (
                    <CityListItem key={city.slug} city={city} />
                ))}
            </ListScrollStack>
        </SectionHeaderStack>
    )
}
