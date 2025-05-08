'use client'

import {City, Flag, ForkKnife, type Icon, MapPin, Tag} from '@phosphor-icons/react'

type IconKey = 'place' | 'country' | 'city' | 'place_type' | 'place_tag'

export const getIcon = (key: IconKey): Icon => {
    switch (key) {
        case 'place':
            return MapPin
        case 'country':
            return Flag
        case 'city':
            return City
        case 'place_type':
            return ForkKnife
        case 'place_tag':
            return Tag
    }
}
