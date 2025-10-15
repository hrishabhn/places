'use client'

import Image from 'next/image'
import {useState} from 'react'

import {type City} from '@/server/types'

import {Splash, SplashIconContainer} from '@/components/views/splash'

export function SingleCity({city}: {city: City}) {
    return <Splash icon={city.icon !== null ? <SingleCityIcon url={city.icon} /> : undefined} title={city.name} subtitle={city.country_name} image={city.image ?? undefined} />
}

function SingleCityIcon({url}: {url: string}) {
    const [error, setError] = useState<boolean>(false)

    if (error) return null

    const size = 48
    return (
        <SplashIconContainer>
            <Image src={url} alt="City Icon" width={size} height={size} className="brightness-200 contrast-200 grayscale" onError={() => setError(true)} />
        </SplashIconContainer>
    )
}
