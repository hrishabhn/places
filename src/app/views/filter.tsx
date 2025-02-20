'use client'

import {revalidateNotion} from '../action'
import {useHomeContext} from '../context'

import {database_id} from '@/model/config'
import {ArrowCounterClockwise, City, Database, DotsThreeVertical, ForkKnife, GithubLogo, type Icon, MapPin, Tag, Triangle} from '@phosphor-icons/react'
import {useIntersectionObserver} from 'usehooks-ts'

import {notionColorToTheme} from '@/lib/notion/color'
import {type NotionSelect} from '@/lib/notion/types'

import {DropdownDivider, DropdownHeader, DropdownMenuItem, DropdownMenuItems, FilterIcon, FilterItem, FilterTray, Menu, MenuButton} from '@/components/ui'

export function HomeFilter() {
    const {isIntersecting, ref} = useIntersectionObserver()

    return (
        <>
            <div ref={ref} />

            <FilterTray>
                <HomeFilterContent />
            </FilterTray>

            {!isIntersecting && (
                <div className="fixed left-0 top-0 z-10 flex w-full flex-wrap items-center gap-2 bg-gradient-to-b from-layer-0 from-25% to-layer-0/80 px-4 py-3 backdrop-blur dark:from-layer-0-dark dark:to-layer-0-dark/80">
                    <HomeFilterContent />
                </div>
            )}
        </>
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
