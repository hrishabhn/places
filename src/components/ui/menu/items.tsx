'use client'

import {MenuItems} from '@headlessui/react'
import {AnimatePresence, motion} from 'motion/react'

import {type DropdownAnchor} from '@/components/ui'

type DropdownMenuProps = {
    open: boolean
    anchor?: DropdownAnchor
    children?: React.ReactNode
}

export function DropdownMenuItems({open, anchor = 'bottom start', children}: DropdownMenuProps) {
    const transition = {duration: 0.1, ease: 'easeInOut'} as const

    const initial = {opacity: 0, scale: 0.95, translateY: -10, transition}
    const final = {opacity: 1, scale: 1, translateY: 0, transition}

    return (
        <AnimatePresence>
            {open && (
                <MenuItems
                    static
                    as={motion.div}
                    initial={initial}
                    animate={final}
                    exit={initial}
                    anchor={{to: anchor, gap: 8}}
                    className="z-50 origin-top rounded-2xl bg-layer-0 shadow-md ring-1 ring-line outline-hidden dark:bg-layer-1-dark dark:ring-line-dark"
                >
                    <div className="max-h-96 w-64 overflow-y-auto py-1">{children}</div>
                </MenuItems>
            )}
        </AnimatePresence>
    )
}
