import {type City} from '@/server/types'

import {Heading, robotoSlab} from '@/components/layout'
import {Splash} from '@/components/views/splash'

export function CityImage({city}: {city: City}) {
    if (!city.image)
        return (
            <div className="w-full bg-line px-4 py-2 sm:px-10 sm:py-6 dark:bg-line-dark">
                <CityTitle name={city.name} countryName={city.country_name} placeCount={city.place_count} />
            </div>
        )

    return (
        <Splash url={city.image} alt={city.name}>
            <CityTitle name={city.name} countryName={city.country_name} placeCount={city.place_count} />
        </Splash>
    )
}

function CityTitle({name, countryName, placeCount}: {name: string; countryName: string; placeCount: number}) {
    return (
        <div className={`${robotoSlab.className}`}>
            <Heading size="h1" withoutPadding>
                {name}
            </Heading>
            <p className="font-medium opacity-60">{[countryName, `${placeCount} places`].join(' • ')}</p>
        </div>
    )
}
