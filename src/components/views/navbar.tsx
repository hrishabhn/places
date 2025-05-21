'use client'

import {City, House, type Icon, Info, List, MapPin, X} from '@phosphor-icons/react'
import {usePrefetchQuery} from '@tanstack/react-query'
import Link from 'next/link'
import {useState} from 'react'

import {useTRPC} from '@/lib/trpc'

export function Navbar() {
    const [open, setOpen] = useState<boolean>(false)

    // prefetch
    const trpc = useTRPC()

    // cities page
    usePrefetchQuery(trpc.GetAllCountry.queryOptions({sort: 'city_count'}))

    usePrefetchQuery(trpc.SearchCityFilter.queryOptions({query: ''}))
    usePrefetchQuery(
        trpc.GetAllCity.queryOptions({
            filter: {countrySlug: []},
            query: '',
            sort: 'place_count',
        })
    )

    // places page
    usePrefetchQuery(trpc.GetAllCountry.queryOptions({sort: 'place_count'}))
    usePrefetchQuery(trpc.GetAllCity.queryOptions({sort: 'place_count'}))
    usePrefetchQuery(trpc.GetAllPlaceType.queryOptions())
    usePrefetchQuery(trpc.GetAllPlaceTag.queryOptions())

    usePrefetchQuery(trpc.SearchPlaceFilter.queryOptions({query: ''}))
    usePrefetchQuery(
        trpc.GetAllPlace.queryOptions({
            filter: {
                id: undefined,
                top: false,
                countrySlug: [],
                citySlug: [],
                placeType: [],
                placeTag: [],
            },
            query: '',
            sort: 'name',
        })
    )

    return (
        <>
            <div className="hidden w-full items-center gap-4 border-b border-cream/10 bg-olive p-4 text-cream sm:grid sm:grid-cols-[1fr,auto,1fr] sm:px-10">
                <div className="flex items-center justify-start">
                    <Link href="/" className="active:opacity-60">
                        <p className="font-serif text-2xl font-bold">Parts Unknown</p>
                    </Link>
                </div>
                <div className="flex items-center justify-center gap-4">
                    <NavbarItemDesktop href="/" icon={House} title="Home" />
                    <NavbarItemDesktop href="/cities" icon={City} title="Cities" />
                    <NavbarItemDesktop href="/places" icon={MapPin} title="Places" />
                </div>
                <div className="flex items-center justify-end">
                    <NavbarItemDesktop href="/about" icon={Info} title="About" />
                </div>
            </div>

            <div className="w-full border-b border-cream/10 bg-olive py-4 text-cream sm:hidden">
                <div className="flex w-full items-center px-4 text-2xl">
                    <Link href="/" className="active:opacity-60">
                        <p className="font-serif text-2xl font-bold">Parts Unknown</p>
                    </Link>
                    <div className="grow" />
                    <button onClick={() => setOpen(!open)} className="active:opacity-60">
                        {open ? <X weight="bold" /> : <List weight="bold" />}
                    </button>
                </div>
                {open && (
                    <div className="flex w-full flex-col px-4 pt-4">
                        <NavbarItemMobile href="/" icon={House} title="Home" onClick={() => setOpen(false)} />
                        <NavbarItemMobile href="/cities" icon={City} title="Cities" onClick={() => setOpen(false)} />
                        <NavbarItemMobile href="/places" icon={MapPin} title="Places" onClick={() => setOpen(false)} />
                        <NavbarItemMobile href="/about" icon={Info} title="About" onClick={() => setOpen(false)} />
                    </div>
                )}
            </div>
        </>
    )
}

// shared
type NavbarItemProps = {
    href: string
    icon: Icon
    title: string
    onClick?: () => void
}

function NavbarItemDesktop({href, icon, title, onClick}: NavbarItemProps) {
    const Icon = icon
    return (
        <Link href={href} onClick={onClick} className="flex items-center gap-1 text-sm font-semibold active:opacity-60">
            <Icon weight="bold" />
            <p className="line-clamp-1">{title}</p>
        </Link>
    )
}

function NavbarItemMobile({href, icon, title, onClick}: NavbarItemProps) {
    const Icon = icon
    return (
        <Link href={href} onClick={onClick} className="flex w-full items-center py-2 font-semibold active:opacity-60">
            <p>{title}</p>
            <div className="grow" />
            <Icon weight="bold" />
        </Link>
    )
}
