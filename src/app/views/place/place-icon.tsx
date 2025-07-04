'use client'

import {BeerSteinIcon, BookOpenIcon, CoffeeIcon, DiscoBallIcon, ForkKnifeIcon, IceCreamIcon, type Icon, MapPinIcon, TreeIcon} from '@phosphor-icons/react'

export function getPlaceIcon(placeType: string | undefined): Icon {
    switch (placeType) {
        // food
        case 'Restaurant':
        case 'Food Hall/Market':
            return ForkKnifeIcon

        // drink
        case 'Bar':
        case 'Nightlife/Bar Area':
            return BeerSteinIcon

        // coffee
        case 'Coffee Shop':
            return CoffeeIcon

        // book
        case 'Book Shop':
            return BookOpenIcon

        // club
        case 'Club':
            return DiscoBallIcon

        // dessert
        case 'Dessert':
            return IceCreamIcon

        // park
        case 'Park':
            return TreeIcon

        // default
        default:
            return MapPinIcon
    }
}
