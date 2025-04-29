'use client'

import {getPlaceIcon} from './place-icon'

import {MapPin, Pencil, Star} from '@phosphor-icons/react'

import {type Place} from '@/server/types'

import {googleMapsUrl, notionUrl} from '@/model/util'

import {SimpleCard} from '@/components/views/card'

export function PlaceCard({place}: {place: Place}) {
    return (
        <SimpleCard
            image={place.image}
            fallbackIcon={getPlaceIcon(place.type.at(0))}
            title={place.name}
            tags={[
                ...(place.top
                    ? [
                          {
                              type: 'primary' as const,
                              icon: <Star weight="fill" className="text-yellow-400" />,
                              text: 'Top',
                          },
                      ]
                    : []),
                {
                    type: 'primary' as const,
                    icon: <MapPin weight="bold" className="opacity-60" />,
                    text: place.city_name,
                },
                ...place.type,
                ...place.tags,
            ]}
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
