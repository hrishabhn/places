'use client'

import {BeerStein as BeerSteinIcon, BookOpen as BookOpenIcon, Coffee as CoffeeIcon, DiscoBall as DiscoBallIcon, ForkKnife as ForkKnifeIcon, IceCream as IceCreamIcon, type Icon, MapPin as MapPinIcon, Tree as TreeIcon} from '@phosphor-icons/react'

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
        case 'CoffeeIcon Shop':
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
