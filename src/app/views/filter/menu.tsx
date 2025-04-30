'use client'

import {useHomeContext} from '../../context'
import {HomeViewMenuItems} from './view'

import {ArrowCounterClockwise, Database, DotsThreeVertical, GithubLogo, MapPin, Triangle, User} from '@phosphor-icons/react'

import {revalidateNotion} from '@/app/revalidate'

import {DropdownDivider, DropdownHeader, DropdownMenuItem, DropdownMenuItems, FilterIcon, Menu, MenuButton} from '@/components/ui'

export function HomeFilterMenu() {
    const {mainPageId, adminMode, toggleAdminMode} = useHomeContext()

    return (
        <Menu>
            <MenuButton className="active:opacity-60">
                <FilterIcon icon={DotsThreeVertical} />
            </MenuButton>
            <DropdownMenuItems anchor="bottom end">
                <HomeViewMenuItems />

                <DropdownDivider />

                <DropdownHeader text="Settings" />
                <DropdownMenuItem action={{onClick: async () => await revalidateNotion()}} image={{icon: ArrowCounterClockwise}} title="Refresh Data" />
                <DropdownMenuItem action={{onClick: toggleAdminMode}} image={{icon: User}} title="Admin Mode" active={adminMode} />

                <DropdownDivider />

                <DropdownHeader text="Resources" />
                <DropdownMenuItem action={{href: `https://notion.so/${mainPageId}`, target: '_blank'}} image={{icon: Database}} title="Database" subtitle="Notion" />
                <DropdownMenuItem
                    action={{href: 'https://developers.google.com/maps/documentation/places/web-service/place-id', target: '_blank'}}
                    image={{icon: MapPin}}
                    title="Place ID"
                    subtitle="Google Maps"
                />
                <DropdownMenuItem action={{href: 'https://github.com/hrishabhn/places', target: '_blank'}} image={{icon: GithubLogo}} title="Source Code" subtitle="GitHub" />
                <DropdownMenuItem action={{href: 'https://vercel.com/hrishabhns/places', target: '_blank'}} image={{icon: Triangle}} title="Preview" subtitle="Vercel" />
            </DropdownMenuItems>
        </Menu>
    )
}
