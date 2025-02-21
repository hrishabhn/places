'use client'

import {revalidateNotion} from '../action'
import {useHomeContext} from '../context'
import './style.css'

import {database_id} from '@/model/config'
import {ArrowCounterClockwise, City, Database, DotsThreeVertical, ForkKnife, GithubLogo, type Icon, MapPin, Tag, Triangle} from '@phosphor-icons/react'
import {motion} from 'motion/react'

import {useSticky} from '@/lib/hooks/is-stuck'
import {notionColorToTheme} from '@/lib/notion/color'
import {type NotionSelect} from '@/lib/notion/types'

import {DropdownDivider, DropdownHeader, DropdownMenuItem, DropdownMenuItems, FilterIcon, FilterItem, Menu, MenuButton} from '@/components/ui'

export function HomeFilter() {
    const {isStuck, ref} = useSticky()

    const padding = isStuck ? 0 : 'var(--px)'
    const transition = {duration: 0.15}

    return (
        <motion.div
            ref={ref}
            animate={{
                paddingLeft: padding,
                paddingRight: padding,
            }}
            transition={transition}
            className="sticky top-0 z-10 w-full"
        >
            <motion.div
                animate={{
                    borderRadius: isStuck ? 0 : 'var(--radius)',
                    background: isStuck ? 'linear-gradient(to bottom, var(--tw-gradient-stops))' : 'var(--layer-1)',
                }}
                transition={transition}
                className="flex w-full flex-wrap items-center gap-2 from-layer-0 from-25% to-layer-0/80 p-2 backdrop-blur dark:from-layer-0-dark dark:to-layer-0-dark/80"
            >
                <HomeFilterContent />
            </motion.div>
        </motion.div>
    )
}

function HomeFilterContent() {
    const {
        allCity,
        allType,
        allTags,

        cityIsSelected,
        typeIsSelected,
        tagIsSelected,

        selectedCity,
        selectedType,
        selectedTags,

        toggleSelectedCity,
        toggleSelectedType,
        toggleSelectedTag,

        clearSelectedCity,
        clearSelectedType,
        clearSelectedTags,
    } = useHomeContext()

    return (
        <>
            <HomeFilterItem
                allItem={allCity}
                icon={City}
                placeholder="City"
                itemIsSelected={cityIsSelected}
                selectedItem={selectedCity}
                toggleSelectedItem={toggleSelectedCity}
                clearSelectedItem={clearSelectedCity}
            />
            <HomeFilterItem
                allItem={allType}
                icon={ForkKnife}
                placeholder="Type"
                itemIsSelected={typeIsSelected}
                selectedItem={selectedType}
                toggleSelectedItem={toggleSelectedType}
                clearSelectedItem={clearSelectedType}
            />
            <HomeFilterItem
                allItem={allTags}
                icon={Tag}
                placeholder="Tags"
                itemIsSelected={tagIsSelected}
                selectedItem={selectedTags}
                toggleSelectedItem={toggleSelectedTag}
                clearSelectedItem={clearSelectedTags}
            />

            <div className="grow" />

            <Menu>
                <MenuButton>
                    <FilterIcon icon={DotsThreeVertical} />
                </MenuButton>
                <DropdownMenuItems anchor="bottom end">
                    <DropdownMenuItem action={{onClick: async () => await revalidateNotion()}} image={{icon: ArrowCounterClockwise}} title="Refresh Data" />

                    <DropdownDivider />

                    <DropdownMenuItem action={{href: `https://notion.so/${database_id}`, target: '_blank'}} image={{icon: Database}} title="Database" subtitle="Notion" />
                    <DropdownMenuItem
                        action={{href: 'https://developers.google.com/maps/documentation/places/web-service/place-id', target: '_blank'}}
                        image={{icon: MapPin}}
                        title="Place ID"
                        subtitle="Google Maps"
                    />

                    <DropdownDivider />

                    <DropdownHeader text="Resources" />
                    <DropdownMenuItem action={{href: 'https://github.com/hrishabhn/places', target: '_blank'}} image={{icon: GithubLogo}} title="Source Code" subtitle="GitHub" />
                    <DropdownMenuItem action={{href: 'https://vercel.com/hrishabhn/places', target: '_blank'}} image={{icon: Triangle}} title="Preview" subtitle="Vercel" />
                </DropdownMenuItems>
            </Menu>
        </>
    )
}

type HomeFilterItemProps<T> = {
    allItem: T[]
    icon: Icon
    placeholder: string
    itemIsSelected: (item: T) => boolean
    selectedItem: T[]
    toggleSelectedItem: (item: T) => void
    clearSelectedItem: () => void
}

function HomeFilterItem({allItem, icon, placeholder, itemIsSelected, selectedItem, toggleSelectedItem, clearSelectedItem}: HomeFilterItemProps<NotionSelect>) {
    const Icon = icon
    return (
        <Menu>
            <MenuButton className="active:opacity-60">
                <FilterItem active={selectedItem.length > 0}>
                    <Icon weight="duotone" className="shrink-0" />
                    <p className="line-clamp-1">{selectedItem.length > 0 ? selectedItem.map(({name}) => name).join(', ') : placeholder}</p>
                </FilterItem>
            </MenuButton>
            <DropdownMenuItems>
                <DropdownMenuItem action={{onClick: () => clearSelectedItem()}} title="Show All" active={selectedItem.length === 0} />
                <DropdownDivider />
                {allItem.map(item => (
                    <DropdownMenuItem
                        key={item.id}
                        action={{onClick: () => toggleSelectedItem(item)}}
                        image={{theme: notionColorToTheme(item.color)}}
                        title={item.name}
                        active={itemIsSelected(item)}
                    />
                ))}
            </DropdownMenuItems>
        </Menu>
    )
}
