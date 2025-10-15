'use client'

import {getPlaceIcon} from './place-icon'

import {useQueryClient} from '@tanstack/react-query'
import Link from 'next/link'

import {type Place} from '@/server/types'

import {useOnScreen} from '@/lib/hooks'
import {useTRPC} from '@/lib/trpc'

import {SimpleCard} from '@/components/views/card'

export function PlaceCard({place}: {place: Place}) {
    // prefetch
    const trpc = useTRPC()
    const queryClient = useQueryClient()

    const ref = useOnScreen(() =>
        queryClient.prefetchQuery(
            trpc.GetAllPlace.queryOptions({
                filter: {id: [place.id]},
                query: '',
                sort: 'name',
            })
        )
    )

    return (
        <Link ref={ref} href={`/places/${place.id}`} className="active:opacity-60">
            <SimpleCard
                //
                image={place.image}
                fallbackIcon={getPlaceIcon(place.type.at(0), {returnDefault: true})}
                title={place.name}
                subtitle={place.city_name}
                tags={[...place.type, ...place.tags]}
            />
        </Link>
    )
}
