'use client'

import {City, type Icon, Info, List, MapPin} from '@phosphor-icons/react'
import Link from 'next/link'
import {useRef, useState} from 'react'
import {useClickAway} from 'react-use'

import {useBreakpoint} from '@/lib/hooks'

import {inter, robotoSlab} from '@/components/layout'

export function Navbar() {
    const sm = useBreakpoint('sm')
    return sm ? <NavbarDesktop /> : <NavbarMobile />
}

function NavbarDesktop() {
    return (
        <div className="flex w-full items-center gap-10 bg-accent px-10 py-4 text-white dark:bg-accent-dark">
            <NavbarTitle />

            <div className="grow" />

            <NavbarItemDesktop href="/cities" icon={City} title="Cities" />
            <NavbarItemDesktop href="/places" icon={MapPin} title="Places" />
            <NavbarItemDesktop href="/about" icon={Info} title="About" />
        </div>
    )
}

function NavbarMobile() {
    const ref = useRef<HTMLDivElement>(null)
    const [open, setOpen] = useState<boolean>(false)
    useClickAway(ref, () => setOpen(false))

    return (
        <div ref={ref} className="w-full bg-accent py-6 text-white dark:bg-accent-dark">
            <div className="flex w-full items-center px-4">
                <NavbarTitle />
                <div className="grow" />
                <button onClick={() => setOpen(!open)} className="active:opacity-60">
                    <List weight="bold" className="text-2xl" />
                </button>
            </div>
            {open && (
                <div className="flex w-full flex-col gap-4 px-4 pt-4">
                    <NavbarItemMobile href="/cities" icon={City} title="Cities" onClick={() => setOpen(false)} />
                    <NavbarItemMobile href="/places" icon={MapPin} title="Places" onClick={() => setOpen(false)} />
                    <NavbarItemMobile href="/about" icon={Info} title="About" onClick={() => setOpen(false)} />
                </div>
            )}
        </div>
    )
}

// shared
function NavbarTitle() {
    return (
        <Link href="/" className={`${robotoSlab.className} line-clamp-1 text-2xl font-bold active:opacity-60`}>
            Travel Guide
        </Link>
    )
}

type NavbarItemProps = {
    href: string
    icon: Icon
    title: string
    onClick?: () => void
}

function NavbarItemDesktop({href, icon, title, onClick}: NavbarItemProps) {
    const Icon = icon
    return (
        <Link href={href} onClick={onClick} className={`${inter.className} flex items-center gap-1 text-sm font-semibold active:opacity-60`}>
            <Icon weight="bold" />
            <p className="line-clamp-1">{title}</p>
        </Link>
    )
}

function NavbarItemMobile({href, icon, title, onClick}: NavbarItemProps) {
    const Icon = icon
    return (
        <Link href={href} onClick={onClick} className={`${inter.className} flex w-full items-center text-sm active:opacity-60`}>
            <p className={`font-semibold`}>{title}</p>
            <div className="grow" />
            <Icon weight="fill" />
        </Link>
    )
}
