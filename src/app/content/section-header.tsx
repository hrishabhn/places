'use client'

import {ArrowRightIcon} from '@phosphor-icons/react'
import Link from 'next/link'

import {HLine} from '@/components/views/h-line'

type SectionHeaderProps = {
    title: string
    href: string
}

export function SectionHeader({title, href}: SectionHeaderProps) {
    return (
        <>
            <div className="pt-4">
                <HLine size="md" />
                <Link href={href} className="group grid w-full grid-cols-[1fr_auto] items-center py-2 hover:underline active:opacity-60">
                    <p className="line-clamp-1 font-serif text-2xl font-semibold">{title}</p>

                    <ArrowRightIcon
                        weight="bold"
                        className="-translate-x-1 scale-95 text-xl opacity-0 transition group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100"
                    />
                </Link>
            </div>
        </>
    )
}
