'use client'

import {type Icon} from '@phosphor-icons/react'

import {Badge, DropdownMenuItem, DropdownMenuItems, Menu, MenuButton} from '@/components/ui'

export function HomeInfoTray({children}: {children?: React.ReactNode}) {
    return <div className="flex flex-wrap items-center gap-2 py-4">{children}</div>
}

type HomeInfoItemProps<T> = {
    icon: Icon
    placeholder: string

    allItem: T[]
    onSelect: (item: T) => void

    isActive: (item: T) => boolean
    toId: (item: T) => string
    toTitle: (item: T) => string
    toSubtitle?: (item: T) => string
}

export function HomeInfoItem<T>({icon, placeholder, allItem, onSelect, isActive, toId, toTitle, toSubtitle}: HomeInfoItemProps<T>) {
    const Icon = icon
    return (
        <Menu>
            <MenuButton className="active:opacity-60">
                <Badge active={allItem.some(isActive)}>
                    <Icon weight="duotone" className="shrink-0" />
                    <p className="line-clamp-1">{placeholder}</p>
                </Badge>
            </MenuButton>
            <DropdownMenuItems>
                {allItem.map(item => (
                    <DropdownMenuItem
                        key={toId(item)}
                        action={{onClick: () => onSelect(item)}}
                        title={toTitle(item)}
                        subtitle={toSubtitle ? toSubtitle(item) : undefined}
                        active={isActive(item)}
                    />
                ))}
            </DropdownMenuItems>
        </Menu>
    )
}
