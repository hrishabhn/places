'use client'

import {CityIcon} from '@phosphor-icons/react'
import {useQueryClient} from '@tanstack/react-query'
import Link from 'next/link'

import {type City} from '@/server/types'

import {useOnScreen} from '@/lib/hooks'
import {useTRPC} from '@/lib/trpc'

import {SimpleCard} from '@/components/views/card'

export function CityCard({city}: {city: City}) {
    // prefetch
    const trpc = useTRPC()
    const queryClient = useQueryClient()

    const ref = useOnScreen(() =>
        queryClient.prefetchQuery(
            trpc.GetAllPlace.queryOptions({
                filter: {citySlug: [city.slug]},
                query: '',
                sort: 'name',
            })
        )
    )

    return (
        <Link ref={ref} href={{pathname: '/places', query: {city: city.slug}}} className="active:opacity-60">
            <SimpleCard
                //
                image={city.image}
                fallbackIcon={CityIcon}
                title={city.name}
                subtitle={city.country_name}
                tags={[`${city.place_count} places`]}
            />
        </Link>
    )
}
