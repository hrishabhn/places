'use client'

import {getPlaceIcon} from './place-icon'
import {placeToTags} from './tags'

import {MapPin, Pencil} from '@phosphor-icons/react'

import {type Place} from '@/server/types'

import {googleMapsUrl, notionUrl} from '@/model/util'

import {SimpleCard} from '@/components/views/card'

export function PlaceCard({place}: {place: Place}) {
    return (
        <SimpleCard
            image={place.image}
            fallbackIcon={getPlaceIcon(place.type.at(0))}
            title={place.name}
            tags={placeToTags(place)}
            links={[
                {
                    url: googleMapsUrl(place),
                    icon: MapPin,
                    title: 'Open in Maps',
                },
                {
                    url: notionUrl(place.id),
                    icon: Pencil,
                    title: 'Edit',
                },
            ]}
            description={place.description}
        />
    )
}
