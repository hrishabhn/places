'use client'

import {GlobeIcon} from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'
import {useState} from 'react'

export function Website({url}: {url: string}) {
    const [error, setError] = useState<boolean>(false)

    const domain = new URL(url).hostname

    return (
        <Link
            href={url}
            target="_blank"
            className="flex w-fit items-center gap-1.5 rounded-full px-2 py-1 text-sm font-bold ring-1 ring-line hover:underline active:opacity-60 dark:ring-line-dark"
        >
            {error ? (
                <GlobeIcon weight="bold" size={16} className="text-olive dark:text-cream" />
            ) : (
                <Image src={`https://www.google.com/s2/favicons?domain=${domain}&sz=16`} alt="" width={16} height={16} onError={() => setError(true)} unoptimized />
            )}
            <p>{domain}</p>
        </Link>
    )
}
