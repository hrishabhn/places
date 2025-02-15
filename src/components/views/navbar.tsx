'use client'

import {GearFine, GithubLogo, House, Triangle} from '@phosphor-icons/react'
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
                            <DropdownMenuItem action={{href: '/settings'}} image={{icon: GearFine}} title="Settings" />

                            <DropdownDivider />
                            <DropdownHeader text="Resources" />
                            <DropdownMenuItem
                                action={{href: 'https://github.com/hrishabhn/next-boilerplate', target: '_blank'}}
                                image={{icon: GithubLogo}}
                                title="Source Code"
                                subtitle="GitHub"
                            />
                            <DropdownMenuItem
                                action={{href: 'https://vercel.com/hrishabhn/next-boilerplate', target: '_blank'}}
                                image={{icon: Triangle}}
                                title="Preview"
                                subtitle="Vercel"
                            />
                        </DropdownMenuItems>
                    </Menu>
                </>
            }
        />
    )
}
