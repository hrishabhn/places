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
                paddingBlock: isStuck ? '1rem' : '0',
            }}
            transition={{duration: 0.1}}
            className="sticky top-0 z-10 flex items-center gap-2 overflow-x-scroll bg-layer-0 py-0 dark:bg-layer-0-dark"
        >
            {children}
        </motion.div>
    )
}
