'use client'

import {ArrowRightIcon} from '@phosphor-icons/react'
import Link from 'next/link'

type SectionHeaderProps = {
    title: string
    href?: string
}

export function SectionHeader({title, href}: SectionHeaderProps) {
    if (href === undefined) return <p className="line-clamp-1 font-serif text-2xl font-semibold">{title}</p>
    return (
        <Link href={href} className="group grid w-full grid-cols-[1fr_auto] items-center pt-4 hover:underline active:opacity-60">
            <SectionHeader title={title} />
            <ArrowRightIcon
                weight="bold"
                className="-translate-x-1 scale-95 text-xl opacity-0 transition group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100"
            />
        </Link>
    )
}

export function SectionHeaderStack({children}: {children?: React.ReactNode}) {
    return <div className="flex w-full flex-col gap-4 overflow-hidden">{children}</div>
}
