'use client'

import {useHomeContext} from '../../context'

import {allView, viewIcon, viewTitle} from '@/model/view'

import {DropdownHeader, DropdownMenuItem, DropdownMenuItems, FilterItem, Menu, MenuButton} from '@/components/ui'

export function HomeViewMenu() {
    const {selectedView} = useHomeContext()

    const Icon = viewIcon(selectedView)

    return (
        <Menu>
            <MenuButton className="active:opacity-60">
                <FilterItem>
                    <Icon weight="bold" className="shrink-0" />
                    <p>{viewTitle(selectedView)}</p>
                </FilterItem>
            </MenuButton>
            <DropdownMenuItems anchor="bottom end">
                <HomeViewMenuItems />
            </DropdownMenuItems>
        </Menu>
    )
}

export function HomeViewMenuItems() {
    const {selectedView, setSelectedView} = useHomeContext()

    return (
        <>
            <DropdownHeader text="View" />
            {allView.map(view => (
                <DropdownMenuItem
                    key={view}
                    action={{onClick: () => setSelectedView(view)}}
                    image={{icon: viewIcon(view)}}
                    title={viewTitle(view)}
                    active={selectedView === view}
                />
            ))}
        </>
    )
}
