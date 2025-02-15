'use client'

import {database_id} from '@/model/config'
import {Database, GearFine, GithubLogo, House, MapPin, Triangle} from '@phosphor-icons/react'
import Link from 'next/link'

import {Navbar, NavbarItem} from '@/components/layout'
import {DropdownDivider, DropdownHeader, DropdownMenuItem, DropdownMenuItems, Menu, MenuButton} from '@/components/ui'

export function NavbarView() {
    return (
        <Navbar
            left={
                <>
                    <Link href="/">
                        <NavbarItem icon={House} title="Home" />
                    </Link>
                </>
            }
            right={
                <>
                    <Menu>
                        <MenuButton>
                            <NavbarItem icon={GearFine} title="Settings" />
                        </MenuButton>
                        <DropdownMenuItems anchor="bottom end">
                            <DropdownMenuItem action={{href: `https://notion.so/${database_id}`, target: '_blank'}} image={{icon: Database}} title="Database" subtitle="Notion" />
                            <DropdownMenuItem
                                action={{href: 'https://developers.google.com/maps/documentation/places/web-service/place-id', target: '_blank'}}
                                image={{icon: MapPin}}
                                title="Place ID"
                                subtitle="Google Maps"
                            />

                            <DropdownDivider />
                            <DropdownHeader text="Resources" />
                            <DropdownMenuItem
                                action={{href: 'https://github.com/hrishabhn/places', target: '_blank'}}
                                image={{icon: GithubLogo}}
                                title="Source Code"
                                subtitle="GitHub"
                            />
                            <DropdownMenuItem action={{href: 'https://vercel.com/hrishabhn/places', target: '_blank'}} image={{icon: Triangle}} title="Preview" subtitle="Vercel" />
                        </DropdownMenuItems>
                    </Menu>
                </>
            }
        />
    )
}
