import {City as CityIcon} from '@phosphor-icons/react'

import {type City} from '@/server/types'

import {SimpleCard} from '@/components/views/card'

export function CityCard({city}: {city: City}) {
    return (
        <SimpleCard
            image={city.image}
            fallbackIcon={CityIcon}
            title={city.name}
            tags={[{type: 'primary', icon: city.country_flag, text: city.country_name}, `${city.place_count} places`]}
        />
    )
}
