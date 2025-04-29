'use client'

import {BeerStein, BookOpen, Coffee, DiscoBall, ForkKnife, IceCream, type Icon, MapPin, Tree} from '@phosphor-icons/react'

export function getPlaceIcon(placeType: string | undefined): Icon {
    switch (placeType) {
        // food
        case 'Restaurant':
        case 'Food Hall/Market':
            return ForkKnife

        // drink
        case 'Bar':
        case 'Nightlife/Bar Area':
            return BeerStein

        // coffee
        case 'Coffee Shop':
            return Coffee

        // book
        case 'Book Shop':
            return BookOpen

        // club
        case 'Club':
            return DiscoBall

        // dessert
        case 'Dessert':
            return IceCream

        // park
        case 'Park':
            return Tree

        // default
        default:
            return MapPin
    }
}
