'use client'

import {CityIcon} from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'
import {useState} from 'react'

import {type City} from '@/server/db/types'

import {ListItem, ListItemIcon, ListItemImageContainer} from '@/components/views/list'

export function CityListItem({city}: {city: City}) {
    return (
        <Link href={{pathname: '/places', query: {city: city.slug}}} className="active:opacity-60">
            <ListItem image={<CityListItemImage url={city.icon} />} title={city.name} subtitle={[city.country_name, `${city.place_count} places`].join(' • ')} />
        </Link>
    )
}

function CityListItemImage({url}: {url: string | null}) {
    const [error, setError] = useState<boolean>(false)

    if (url === null || error) return <ListItemIcon icon={CityIcon} />

    const size = 40
    return (
        <ListItemImageContainer>
            <Image src={url} alt="City Icon" width={size} height={size} className="brightness-200 contrast-200 grayscale" onError={() => setError(true)} />
        </ListItemImageContainer>
    )
}
