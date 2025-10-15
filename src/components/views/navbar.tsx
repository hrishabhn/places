'use client'

import {CityIcon, HouseIcon, type Icon, InfoIcon, ListIcon, MapPinIcon, XIcon} from '@phosphor-icons/react'
import {usePrefetchQuery} from '@tanstack/react-query'
import {AnimatePresence, motion} from 'motion/react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useEffect, useState} from 'react'

import {appTitle} from '@/model/app'

import {useTRPC} from '@/lib/trpc'

export function Navbar() {
    const [open, setOpen] = useState<boolean>(false)
    const pathname = usePathname()

    useEffect(() => {
        setOpen(false)
    }, [pathname])

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

    const Icon: Icon = open ? XIcon : ListIcon

    return (
        <>
            <div className="sticky top-0 z-50">
                <div className="flex w-full items-center border-b border-accent-light/20 bg-accent-dark p-4 text-accent-light sm:px-6">
                    <AppTitle />
                    <div className="grow" />
                    <button onClick={() => setOpen(!open)} className="active:opacity-60">
                        <Icon size={24} weight="bold" />
                    </button>
                </div>

                <AnimatePresence>
                    {open && (
                        <>
                            <motion.div
                                initial={{translateY: '-100%'}}
                                animate={{translateY: 0}}
                                exit={{translateY: '-100%', transition: {duration: 0.1}}}
                                transition={{ease: 'easeInOut', duration: 0.2}}
                                className="absolute inset-x-0 top-full -z-10 flex flex-col border-b border-accent-light/20 bg-accent-dark p-4 text-accent-light shadow-lg sm:px-6"
                            >
                                <NavbarItem href="/" title="Home" icon={HouseIcon} />
                                <NavbarItem href="/cities" title="Cities" icon={CityIcon} />
                                <NavbarItem href="/places" title="Places" icon={MapPinIcon} />
                                <NavbarItem href="/about" title="About" icon={InfoIcon} />
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </>
    )
}

function AppTitle() {
    return (
        <Link href="/" className="line-clamp-1 font-heading text-4xl font-medium active:opacity-60">
            {appTitle}
        </Link>
    )
}

// shared
type NavbarItemProps = {
    href: string
    title: string
    icon: Icon
}

function NavbarItem({href, title, icon: Icon}: NavbarItemProps) {
    return (
        <Link href={href} className="line-clamp-1 flex w-full items-center py-2 font-heading text-2xl font-medium hover:underline active:opacity-60">
            <p className="grow">{title}</p>
            <Icon weight="duotone" />
        </Link>
    )
}
