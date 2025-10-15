'use client'

import {BeerSteinIcon, BookOpenIcon, BreadIcon, CoffeeIcon, DiscoBallIcon, ForkKnifeIcon, IceCreamIcon, type Icon, MapPinIcon, TreeIcon} from '@phosphor-icons/react'

export function getPlaceIcon(placeType: string | undefined, options: {returnDefault: true}): Icon
export function getPlaceIcon(placeType: string | undefined, options: {returnDefault: false}): Icon | undefined
export function getPlaceIcon(placeType: string | undefined, {returnDefault}: {returnDefault: boolean}): Icon | undefined {
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

        case 'Bakery':
            return BreadIcon

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
            return returnDefault ? MapPinIcon : undefined
    }
}
