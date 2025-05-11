'use client'

import {City as CityIcon, MapPin} from '@phosphor-icons/react'
import {useQueryClient} from '@tanstack/react-query'

import {type City} from '@/server/types'

import {countryFlag} from '@/model/util'

import {useOnScreen} from '@/lib/hooks'
import {useTRPC} from '@/lib/trpc'

import {SimpleImage} from '@/components/ui'
import {SimpleCard} from '@/components/views/card'

export function CityCard({city}: {city: City}) {
    // prefetch
    const trpc = useTRPC()
    const queryClient = useQueryClient()

    const ref = useOnScreen(() =>
        queryClient.prefetchQuery(
            trpc.GetAllPlace.queryOptions({
                filter: {citySlug: [city.slug]},
                query: '',
                sort: 'name',
            })
        )
    )

    return (
        <div ref={ref}>
            <SimpleCard
                image={city.image}
                fallbackIcon={CityIcon}
                title={city.name}
                tags={[
                    {
                        type: 'primary',
                        icon: (
                            <div className="size-[1em]">
                                <SimpleImage url={countryFlag(city.country_code)} />
                            </div>
                        ),
                        text: city.country_name,
                    },
                    `${city.place_count} places`,
                ]}
                links={[
                    {
                        url: `/places?city=${city.slug}`,
                        icon: MapPin,
                        title: 'View Places',
                    },
                ]}
            />
        </div>
    )
}
