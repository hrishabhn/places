'use client'

import './style.css'

import {ArrowsDownUp, type Icon} from '@phosphor-icons/react'
import {motion} from 'motion/react'

import {useIsStuck, useOnScreen} from '@/lib/hooks'

import {DropdownMenuItem, DropdownMenuItems, type LabelImageType, Menu, MenuButton} from '@/components/ui'

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
            className="sticky top-0 z-10 flex items-center gap-2 overflow-x-scroll border-t border-t-white/10 bg-accent py-3 dark:bg-accent-dark"
        >
            {children}
        </motion.div>
    )
}

export function MenuBarItem({active = false, children}: {active?: boolean; children?: React.ReactNode}) {
    return (
        <div
            className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold ${active ? 'bg-white text-accent dark:text-accent-dark' : 'bg-white/5 text-white hover:hover:bg-white/10'}`}
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

    onScreen?: (item: T) => void
}

type MenuBarSelectItemProps = {
    onSelect: () => void

    active: boolean
    image?: LabelImageType
    title: string
    subtitle?: string

    onScreen?: () => void
}

export function MenuBarSelect<T>({icon, placeholder, allItem, onSelect, isActive, toId, toImage, toTitle, toSubtitle, onScreen}: MenuBarSelectProps<T>) {
    const Icon = icon
    return (
        <Menu>
            <MenuButton className="active:opacity-60">
                <MenuBarItem active={allItem.some(isActive)}>
                    <Icon weight="duotone" className="shrink-0" />
                    <p className="line-clamp-1">{placeholder}</p>
                </MenuBarItem>
            </MenuButton>
            <DropdownMenuItems>
                {allItem.map(item => (
                    <MenuBarSelectItem
                        key={toId(item)}
                        onSelect={() => onSelect(item)}
                        image={toImage ? toImage(item) : undefined}
                        title={toTitle(item)}
                        subtitle={toSubtitle ? toSubtitle(item) : undefined}
                        active={isActive(item)}
                        onScreen={() => onScreen?.(item)}
                    />
                ))}
            </DropdownMenuItems>
        </Menu>
    )
}

function MenuBarSelectItem({onSelect, image, title, subtitle, active, onScreen}: MenuBarSelectItemProps) {
    const ref = useOnScreen(() => onScreen?.())
    return (
        <div ref={ref}>
            <DropdownMenuItem action={{onClick: onSelect}} image={image} title={title} subtitle={subtitle} active={active} />
        </div>
    )
}

type MenuBarSortProps<AllOption extends readonly string[], Option = AllOption[number]> = {
    selectedSort: Option
    allSort: AllOption
    onSelect: (option: Option) => void

    toIcon: (option: Option) => Icon
    toTitle: (option: Option) => string

    onScreen?: (option: Option) => void
}

type MenuBarSortItemProps = {
    onSelect: () => void

    active: boolean
    image: LabelImageType
    title: string

    onScreen?: () => void
}

export function MenuBarSort<T extends readonly string[]>({selectedSort, allSort, onSelect, toIcon, toTitle, onScreen}: MenuBarSortProps<T>) {
    return (
        <Menu>
            <MenuButton className="active:opacity-60">
                <MenuBarItem>
                    <ArrowsDownUp weight="bold" className="shrink-0" />
                    <p>{toTitle(selectedSort)}</p>
                </MenuBarItem>
            </MenuButton>
            <DropdownMenuItems anchor="bottom end">
                {allSort.map(sort => (
                    <MenuBarSortItem
                        key={sort}
                        onSelect={() => onSelect(sort)}
                        image={{icon: toIcon(sort)}}
                        title={toTitle(sort)}
                        active={sort === selectedSort}
                        onScreen={() => onScreen?.(sort)}
                    />
                ))}
            </DropdownMenuItems>
        </Menu>
    )
}

function MenuBarSortItem({onSelect, image, title, active, onScreen}: MenuBarSortItemProps) {
    const ref = useOnScreen(() => onScreen?.())
    return (
        <div ref={ref}>
            <DropdownMenuItem action={{onClick: onSelect}} image={image} title={title} active={active} />
        </div>
    )
}
