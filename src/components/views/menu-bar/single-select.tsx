'use client'

import {MenuBarItem} from './item'

import {type Icon} from '@phosphor-icons/react'

import {useOnScreen} from '@/lib/hooks'

import {DropdownMenuItem, DropdownMenuItems, type LabelImageType, Menu, MenuButton} from '@/components/ui'

type MenuBarSelectProps<T> = {
    icon: Icon
    text: string
    active?: boolean

    allItem: T[]
    onSelect: (item: T) => void

    isActive: (item: T) => boolean
    toId: (item: T) => string
    toImage?: (item: T) => LabelImageType
    toTitle: (item: T) => string
    toSubtitle?: (item: T) => string

    onScreen?: (item: T) => void
}

export function MenuBarSelect<T>({icon: Icon, text, active = false, allItem, onSelect, isActive, toId, toImage, toTitle, toSubtitle, onScreen}: MenuBarSelectProps<T>) {
    return (
        <Menu>
            <MenuButton className="active:opacity-60">
                <MenuBarItem active={active}>
                    <Icon weight="bold" className="shrink-0" />
                    <p>{text}</p>
                </MenuBarItem>
            </MenuButton>
            <DropdownMenuItems>
                {allItem.map(item => (
                    <Item
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

type ItemProps = {
    onSelect: () => void

    active: boolean
    image?: LabelImageType
    title: string
    subtitle?: string

    onScreen?: () => void
}

function Item({onSelect, image, title, subtitle, active, onScreen}: ItemProps) {
    const ref = useOnScreen(() => onScreen?.())
    return (
        <div ref={ref}>
            <DropdownMenuItem action={{onClick: onSelect}} image={image} title={title} subtitle={subtitle} active={active} />
        </div>
    )
}
