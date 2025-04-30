'use client'

import './style.css'

import {type Icon} from '@phosphor-icons/react'
import {motion} from 'motion/react'

import {useIsStuck} from '@/lib/hooks'

import {DropdownMenuItem, DropdownMenuItems, FilterItem, type LabelImageType, Menu, MenuButton} from '@/components/ui'

export function MenuBarTray({children}: {children?: React.ReactNode}) {
    const {isStuck, ref} = useIsStuck()

    return (
        <motion.div
            ref={ref}
            initial={false}
            animate={{
                paddingInline: isStuck ? '1rem' : 'var(--px)',
                backgroundColor: isStuck ? 'var(--accent)' : 'var(--accent-secondary)',
            }}
            transition={{duration: 0.1}}
            className="sticky top-0 z-10 flex flex-wrap items-center gap-2 py-3"
        >
            {children}
        </motion.div>
    )
}

export function MenuBarItem({active = false, children}: {active?: boolean; children?: React.ReactNode}) {
    return (
        <div
            className={`flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium ${active ? 'bg-white text-accent dark:text-accent-dark' : 'bg-white/5 text-white hover:hover:bg-white/10'}`}
        >
            {children}
        </div>
    )
}

type MenuBarSelectProps<T> = {
    icon: Icon
    placeholder: string

    allItem: T[]
    onSelect: (item: T) => void

    isActive: (item: T) => boolean
    toId: (item: T) => string
    toImage?: (item: T) => LabelImageType
    toTitle: (item: T) => string
    toSubtitle?: (item: T) => string
}

export function MenuBarSelect<T>({icon, placeholder, allItem, onSelect, isActive, toId, toImage, toTitle, toSubtitle}: MenuBarSelectProps<T>) {
    const Icon = icon
    return (
        <Menu>
            <MenuButton className="active:opacity-60">
                <FilterItem active={allItem.some(isActive)}>
                    <Icon weight="duotone" className="shrink-0" />
                    <p className="line-clamp-1">{placeholder}</p>
                </FilterItem>
            </MenuButton>
            <DropdownMenuItems>
                {allItem.map(item => (
                    <DropdownMenuItem
                        key={toId(item)}
                        action={{onClick: () => onSelect(item)}}
                        image={toImage ? toImage(item) : undefined}
                        title={toTitle(item)}
                        subtitle={toSubtitle ? toSubtitle(item) : undefined}
                        active={isActive(item)}
                    />
                ))}
            </DropdownMenuItems>
        </Menu>
    )
}
