'use client'

import {Dialog} from '@headlessui/react'
import {ListIcon, XIcon} from '@phosphor-icons/react'
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

    return (
        <>
            <div className="sticky top-0 z-50 flex w-full items-center border-b border-accent-light/20 bg-accent-dark text-accent-light">
                <div className="flex w-full items-center p-4 sm:px-6">
                    <AppTitle />
                    <div className="grow" />
                    <button onClick={() => setOpen(!open)} className="active:opacity-60">
                        <ListIcon weight="bold" className="text-lg" />
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <Dialog static open={open} onClose={() => setOpen(false)} className="relative z-50 text-accent-dark dark:text-accent-light">
                        <motion.button
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            // exit={{opacity: 0, transition: {duration: 0.1}}}
                            transition={{ease: 'easeInOut', duration: 0.2}}
                            className="fixed inset-0 size-full bg-black/40 backdrop-blur"
                            onClick={() => setOpen(false)}
                        />
                        <motion.div
                            initial={{translateX: 100, opacity: 0}}
                            animate={{translateX: 0, opacity: 1}}
                            // exit={{translateX: 100, opacity: 0, transition: {duration: 0.1}}}
                            transition={{ease: 'easeInOut', duration: 0.2}}
                            className="fixed inset-y-0 right-0 z-50 flex w-full flex-col overflow-y-auto bg-layer-0 sm:w-96 dark:bg-layer-1-dark"
                        >
                            <div className="flex items-center border-b-4 border-current p-4 sm:px-6">
                                <AppTitle />
                                <div className="grow" />
                                <button onClick={() => setOpen(false)} className="active:opacity-60">
                                    <XIcon size={24} weight="bold" />
                                </button>
                            </div>
                            <div className="flex flex-col p-4 sm:px-6">
                                <NavbarItem href="/" title="Home" />
                                <NavbarItem href="/cities" title="Cities" />
                                <NavbarItem href="/places" title="Places" />
                                <NavbarItem href="/about" title="About" />
                            </div>
                        </motion.div>
                    </Dialog>
                )}
            </AnimatePresence>
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
}

function NavbarItem({href, title}: NavbarItemProps) {
    return (
        <Link href={href} className="line-clamp-1 flex w-full items-center py-1 text-lg font-semibold uppercase tracking-widest active:opacity-60">
            {title}
        </Link>
    )
}
