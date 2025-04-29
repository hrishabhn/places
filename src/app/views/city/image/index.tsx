import './style.css'

import {type City} from '@/server/types'

import {robotoSlab} from '@/components/layout'
import {SimpleImage} from '@/components/ui'

export function CityImage({city}: {city: City}) {
    if (!city.image)
        return (
            <div className="w-full bg-line px-4 py-2 sm:px-10 sm:py-6 dark:bg-line-dark">
                <CityTitle name={city.name} countryName={city.country_name} placeCount={city.place_count} />
            </div>
        )

    return (
        <div className="relative aspect-video max-h-[768px] w-full">
            <SimpleImage url={city.image} alt={city.name} verticalAlign="top" />
            <div className="gradient-mask absolute inset-0 backdrop-blur-xl" />
            <div className="absolute inset-0 flex items-end justify-start px-4 py-2 text-white sm:px-10 sm:py-4">
                <CityTitle name={city.name} countryName={city.country_name} placeCount={city.place_count} />
            </div>
        </div>
    )
}

function CityTitle({name, countryName, placeCount}: {name: string; countryName: string; placeCount: number}) {
    return (
        <div className={`${robotoSlab.className}`}>
            <p className="text-3xl font-medium">{name}</p>
            <p className="font-medium opacity-60">{[countryName, `${placeCount} places`].join(' • ')}</p>
        </div>
    )
}
