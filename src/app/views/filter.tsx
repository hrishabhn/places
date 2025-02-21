'use client'

import {revalidateNotion} from '../action'
import {useHomeContext} from '../context'
import './style.css'

import {database_id} from '@/model/config'
import {ArrowCounterClockwise, City, Database, DotsThreeVertical, ForkKnife, GithubLogo, type Icon, MapPin, Star, Tag, Triangle} from '@phosphor-icons/react'
import {motion} from 'motion/react'

import {useSticky} from '@/lib/hooks/is-stuck'
import {notionColorToTheme} from '@/lib/notion/color'
import {type NotionSelect} from '@/lib/notion/types'

import {DropdownDivider, DropdownHeader, DropdownMenuItem, DropdownMenuItems, FilterIcon, FilterItem, Menu, MenuButton} from '@/components/ui'

export function HomeFilter() {
    const {isStuck, ref} = useSticky()

    const transition = {duration: 0.1}

    return (
        <motion.div
            ref={ref}
            animate={{
                paddingInline: isStuck ? 0 : 'var(--px)',
            }}
            transition={transition}
            className="sticky top-0 z-10 w-full"
        >
            <motion.div
                animate={{
                    borderRadius: isStuck ? 0 : '0.75rem',
                    backgroundColor: isStuck ? 'var(--bg-after)' : 'var(--bg-before)',
                    padding: isStuck ? '1rem' : '0.5rem',
                }}
                transition={transition}
                className={`flex w-full flex-wrap items-center gap-2 py-4 backdrop-blur ${isStuck ? 'bg-gradient-to-b from-layer-0 from-25% to-transparent dark:from-layer-0-dark' : ''}`}
            >
                <HomeFilterContent />
            </motion.div>
        </motion.div>
    )
}

function HomeFilterContent() {
    const {
        top,
        setTop,

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
            <button onClick={() => setTop(!top)} className="active:opacity-60">
                <FilterItem active={top}>
                    <Star weight="fill" className="shrink-0" />
                    <p className="line-clamp-1">Top</p>
                </FilterItem>
            </button>

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
                    <p className="line-clamp-1">{placeholder}</p>
                </FilterItem>
            </MenuButton>
            <DropdownMenuItems>
                <DropdownMenuItem action={{onClick: () => clearSelectedItem()}} title="Show All" active={selectedItem.length === 0} />
                {selectedItem.length > 0 && (
                    <>
                        <DropdownDivider />
                        {selectedItem.map(item => (
                            <DropdownMenuItem
                                key={item.id}
                                action={{onClick: () => toggleSelectedItem(item)}}
                                image={{theme: notionColorToTheme(item.color)}}
                                title={item.name}
                                active
                            />
                        ))}
                    </>
                )}

                <DropdownDivider />
                {allItem
                    .filter(item => !itemIsSelected(item))
                    .map(item => (
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
