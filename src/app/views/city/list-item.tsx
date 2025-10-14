'use client'

import {CityIcon} from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'
import {useState} from 'react'

import {type City} from '@/server/types'

export function CityListItem({city}: {city: City}) {
    return (
        <Link href={`/places?city=${city.slug}`} className="flex items-center gap-3">
            <CityListItemImage url={city.icon} />
            <div>
                <p className="line-clamp-1 font-serif text-xl font-semibold">{city.name}</p>
                <p className="line-clamp-1 text-xs font-semibold uppercase opacity-60">{[city.country_name, `${city.place_count} places`].join(' • ')}</p>
            </div>
        </Link>
    )
}

function CityListItemImage({url}: {url: string | null}) {
    const [error, setError] = useState<boolean>(false)

    return (
        <div className="rounded-full bg-layer-1 dark:bg-layer-1-dark">
            {url !== null && !error ? (
                <Image src={url} alt="City Icon" width={48} height={48} className="brightness-0 contrast-200 grayscale dark:brightness-200" onError={() => setError(true)} />
            ) : (
                <div className="flex size-12 items-center justify-center">
                    <CityIcon size={24} />
                </div>
            )}
        </div>
    )
}
