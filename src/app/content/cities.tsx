'use client'

import {CityListItem} from '../views/city/list-item'

import {useQuery} from '@tanstack/react-query'

import {useTRPC} from '@/lib/trpc'

import {ListScrollStack} from '@/components/views/list'
import {ErrorView, LoadingView} from '@/components/views/state'

export function HomeContentCities() {
    const trpc = useTRPC()

    const {status: allCityStatus, data: allCity} = useQuery(trpc.GetAllCity.queryOptions({sort: 'place_count'}))

    if (allCityStatus === 'pending') return <LoadingView />
    if (allCityStatus === 'error') return <ErrorView />

    return (
        <ListScrollStack>
            {allCity.map(city => (
                <CityListItem key={city.slug} city={city} />
            ))}
        </ListScrollStack>
    )
}
