'use client'

import {CityIcon} from '@phosphor-icons/react'
import {useQueryClient} from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import {useState} from 'react'

import {type City} from '@/server/types'

import {useOnScreen} from '@/lib/hooks'
import {useTRPC} from '@/lib/trpc'

import {ListItem, ListItemIcon, ListItemImageContainer} from '@/components/views/list'

export function CityListItem({city}: {city: City}) {
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
        <Link ref={ref} href={`/places?city=${city.slug}`} className="active:opacity-60">
            <ListItem image={<CityListItemImage url={city.icon} />} title={city.name} subtitle={[city.country_name, `${city.place_count} places`].join(' • ')} />
        </Link>
    )
}

function CityListItemImage({url}: {url: string | null}) {
    const [error, setError] = useState<boolean>(false)

    if (url !== null && !error)
        return (
            <ListItemImageContainer>
                <Image src={url} alt="City Icon" width={40} height={40} className="brightness-0 contrast-200 grayscale dark:brightness-200" onError={() => setError(true)} />
            </ListItemImageContainer>
        )

    return <ListItemIcon icon={CityIcon} />
}
