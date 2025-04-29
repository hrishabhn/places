import {City as CityIcon} from '@phosphor-icons/react'

import {type City} from '@/server/types'

import {countryFlag} from '@/model/util'

import {SimpleImage} from '@/components/ui'
import {SimpleCard} from '@/components/views/card'

export function CityCard({city}: {city: City}) {
    return (
        <SimpleCard
            image={city.image}
            fallbackIcon={CityIcon}
            title={city.name}
            tags={[
                {
                    type: 'primary',
                    icon: (
                        <div className="size-[1.2em]">
                            <SimpleImage url={countryFlag(city.country_code)} />
                        </div>
                    ),
                    text: city.country_name,
                },
                `${city.place_count} places`,
            ]}
        />
    )
}
