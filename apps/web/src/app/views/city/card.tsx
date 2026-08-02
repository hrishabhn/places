'use client'

import {CityIcon} from '@phosphor-icons/react'
import Link from 'next/link'

import {type City} from '@/server/db/types'

import {SimpleCard} from '@/components/views/card'

export function CityCard({city}: {city: City}) {
    return (
        <Link href={{pathname: '/places', query: {city: city.slug}}} className="active:opacity-60">
            <SimpleCard
                //
                image={city.image}
                fallbackIcon={CityIcon}
                title={city.name}
                subtitle={city.country_name}
                tags={[`${city.place_count} places`]}
            />
        </Link>
    )
}
