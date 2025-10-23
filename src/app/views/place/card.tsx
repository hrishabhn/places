'use client'

import {getPlaceIcon} from './place-icon'

import Link from 'next/link'

import {type Place} from '@/server/db/types'

import {SimpleCard} from '@/components/views/card'

export function PlaceCard({place}: {place: Place}) {
    return (
        <Link href={`/places/${place.id}`} className="active:opacity-60">
            <SimpleCard
                image={place.image}
                fallbackIcon={getPlaceIcon(place.type.at(0), {returnDefault: true})}
                title={place.name}
                subtitle={place.city_name}
                tags={[...place.type, ...place.tags]}
                top={place.top}
            />
        </Link>
    )
}
