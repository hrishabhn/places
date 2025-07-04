'use client'

import {getPlaceIcon} from './place-icon'
import {placeToTags} from './tags'

import {MapPin as MapPinIcon, Pencil as PencilIcon} from '@phosphor-icons/react'

import {type Place} from '@/server/types'

import {googleMapsUrl, notionUrl} from '@/model/util'

import {SimpleCard} from '@/components/views/card'

type PlaceCardProps = {
    place: Place
    bookmark?: boolean
    onBookmark?: () => void
}

export function PlaceCard({place, bookmark, onBookmark}: PlaceCardProps) {
    return (
        <SimpleCard
            image={place.image}
            fallbackIcon={getPlaceIcon(place.type.at(0))}
            title={place.name}
            tags={placeToTags(place)}
            bookmark={bookmark}
            onBookmark={onBookmark}
            links={[
                {
                    url: googleMapsUrl(place),
                    icon: MapPinIcon,
                    title: 'Open in Maps',
                },
                {
                    url: notionUrl(place.id),
                    icon: PencilIcon,
                    title: 'Edit',
                },
            ]}
            description={place.description}
        />
    )
}
