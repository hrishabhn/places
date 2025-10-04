'use client'

import './style.css'

import {motion} from 'motion/react'

import {useIsStuck} from '@/lib/hooks'

export function MenuBarTray({children}: {children?: React.ReactNode}) {
    const {isStuck, ref} = useIsStuck()

    return (
        <motion.div
            ref={ref}
            initial={false}
            animate={{
                paddingInline: isStuck ? '1rem' : 'var(--px)',
            }}
            transition={{duration: 0.1}}
            className="sticky top-0 z-10 flex items-center gap-2 overflow-x-scroll border-b border-cream/10 bg-olive py-3"
        >
            {children}
        </motion.div>
    )
}
