'use client'

import {CityIcon, FlagIcon, ForkKnifeIcon, type Icon, MapPinIcon, TagIcon} from '@phosphor-icons/react'

type IconKey = 'place' | 'country' | 'city' | 'place_type' | 'place_tag'

export const getIcon = (key: IconKey): Icon => {
    switch (key) {
        case 'place':
            return MapPinIcon
        case 'country':
            return FlagIcon
        case 'city':
            return CityIcon
        case 'place_type':
            return ForkKnifeIcon
        case 'place_tag':
            return TagIcon
    }
}
