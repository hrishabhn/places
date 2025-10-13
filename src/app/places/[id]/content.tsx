'use client'

import {useQuery} from '@tanstack/react-query'
import {notFound} from 'next/navigation'

import {useTRPC} from '@/lib/trpc'

import {Loading} from '@/components/views/loading'
import {Splash} from '@/components/views/splash'
import {DetailStack} from '@/components/views/stack'

export function PlacePageContent({id}: {id: string}) {
    const trpc = useTRPC()
    const {status: placeStatus, data: place} = useQuery(trpc.GetPlace.queryOptions({id}))

    if (placeStatus === 'pending') return <Loading />
    if (placeStatus === 'error') throw new Error('Failed to load place')

    if (place === null) return notFound()

    return (
        <DetailStack padding>
            <Splash title={place.name} subtitle={place.city_name} image={place.image ?? undefined} />
        </DetailStack>
    )
}
