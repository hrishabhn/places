'use client'

import {Dialog, DialogPanel} from '@headlessui/react'
import {AnimatePresence, motion} from 'motion/react'
import {Fragment} from 'react'

import {useBreakpoint} from '@/lib/hooks'

import {Heading} from '@/components/layout'

type DrawerProps = {
    open: boolean
    onClose: () => void
    title?: string
    subtitle?: string
    children?: React.ReactNode
}

export function Drawer({open, onClose, title, subtitle, children}: DrawerProps) {
    // get device size
    const isAboveSm = useBreakpoint('sm')

    return (
        <AnimatePresence>
            {open && (
                <Dialog static open={open} onClose={() => onClose()} className="relative z-50">
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0, transition: {duration: 0.1}}}
                        transition={{ease: 'easeInOut', duration: 0.2}}
                        className="fixed inset-0 size-full bg-black/40 backdrop-blur"
                    />
                    <div className="fixed inset-0 grid size-full grid-flow-row grid-cols-1 grid-rows-[minmax(144px,1fr),auto] items-center justify-center sm:grid-flow-col sm:grid-cols-[1fr,512px] sm:grid-rows-1">
                        <div />
                        <DialogPanel as={Fragment}>
                            <motion.div
                                initial={{
                                    x: isAboveSm ? '100%' : undefined,
                                    y: isAboveSm ? undefined : '100%',
                                }}
                                animate={{x: 0, y: 0, opacity: 1}}
                                exit={{
                                    x: isAboveSm ? '100%' : undefined,
                                    y: isAboveSm ? undefined : '100%',
                                    transition: {duration: 0.1},
                                }}
                                transition={{ease: 'easeInOut', duration: 0.2}}
                                className="grid size-full grid-rows-[auto,1fr] overflow-hidden rounded-t-lg bg-layer-0 shadow-xl sm:rounded-none sm:border-l sm:border-line dark:bg-layer-0-dark sm:dark:border-line-dark"
                            >
                                {title || subtitle ? (
                                    <div className="border-b border-line px-5 py-4 sm:px-8 sm:py-6 dark:border-line-dark">
                                        {subtitle && (
                                            <Heading size="h6" withoutPadding>
                                                <p className="line-clamp-1">{subtitle}</p>
                                            </Heading>
                                        )}
                                        {title && (
                                            <Heading size="h2" withoutPadding>
                                                {title}
                                            </Heading>
                                        )}
                                    </div>
                                ) : (
                                    <div />
                                )}
                                <div className="size-full overflow-y-scroll overscroll-contain px-5 py-4 sm:px-8 sm:py-6">{children}</div>
                            </motion.div>
                        </DialogPanel>
                    </div>
                </Dialog>
            )}
        </AnimatePresence>
    )
}
