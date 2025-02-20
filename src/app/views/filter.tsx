'use client'

import {revalidateNotion} from '../action'
import {useHomeContext} from '../context'

import {database_id} from '@/model/config'
import {ArrowCounterClockwise, City, Database, DotsThreeVertical, ForkKnife, GithubLogo, MapPin, Tag, Triangle} from '@phosphor-icons/react'

import {notionColorToTheme} from '@/lib/notion/color'

import {DropdownDivider, DropdownHeader, DropdownMenuItem, DropdownMenuItems, FilterIcon, FilterItem, FilterTray, Menu, MenuButton} from '@/components/ui'

export function HomeFilter() {
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
            <FilterTray>
                <Menu>
                    <MenuButton className="active:opacity-60">
                        <FilterItem active={selectedCity.length > 0}>
                            <City weight="duotone" />
                            <p className="line-clamp-1">{selectedCity.length > 0 ? selectedCity.map(({name}) => name).join(', ') : 'City'}</p>
                        </FilterItem>
                    </MenuButton>
                    <DropdownMenuItems>
                        <DropdownMenuItem action={{onClick: () => clearSelectedCity()}} title="Show All" active={selectedCity.length === 0} />
                        <DropdownDivider />
                        {allCity.map(city => (
                            <DropdownMenuItem
                                key={city.id}
                                action={{onClick: () => toggleSelectedCity(city)}}
                                image={{theme: notionColorToTheme(city.color)}}
                                title={city.name}
                                active={cityIsSelected(city)}
                            />
                        ))}
                    </DropdownMenuItems>
                </Menu>

                <Menu>
                    <MenuButton className="active:opacity-60">
                        <FilterItem active={selectedType.length > 0}>
                            <ForkKnife weight="duotone" />
                            <p className="line-clamp-1">{selectedType.length > 0 ? selectedType.map(({name}) => name).join(', ') : 'Type'}</p>
                        </FilterItem>
                    </MenuButton>
                    <DropdownMenuItems>
                        <DropdownMenuItem action={{onClick: () => clearSelectedType()}} title="Show All" active={selectedType.length === 0} />
                        <DropdownDivider />
                        {allType.map(type => (
                            <DropdownMenuItem
                                key={type.id}
                                action={{onClick: () => toggleSelectedType(type)}}
                                image={{theme: notionColorToTheme(type.color)}}
                                title={type.name}
                                active={typeIsSelected(type)}
                            />
                        ))}
                    </DropdownMenuItems>
                </Menu>

                <Menu>
                    <MenuButton className="active:opacity-60">
                        <FilterItem active={selectedTags.length > 0}>
                            <Tag weight="duotone" />
                            <p className="line-clamp-1">{selectedTags.length > 0 ? selectedTags.map(({name}) => name).join(', ') : 'Tags'}</p>
                        </FilterItem>
                    </MenuButton>
                    <DropdownMenuItems>
                        <DropdownMenuItem action={{onClick: () => clearSelectedTags()}} title="Show All" active={selectedTags.length === 0} />
                        <DropdownDivider />
                        {allTags.map(tag => (
                            <DropdownMenuItem
                                key={tag.id}
                                action={{onClick: () => toggleSelectedTag(tag)}}
                                image={{theme: notionColorToTheme(tag.color)}}
                                title={tag.name}
                                active={tagIsSelected(tag)}
                            />
                        ))}
                    </DropdownMenuItems>
                </Menu>

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
                        <DropdownMenuItem
                            action={{href: 'https://github.com/hrishabhn/places', target: '_blank'}}
                            image={{icon: GithubLogo}}
                            title="Source Code"
                            subtitle="GitHub"
                        />
                        <DropdownMenuItem action={{href: 'https://vercel.com/hrishabhn/places', target: '_blank'}} image={{icon: Triangle}} title="Preview" subtitle="Vercel" />
                    </DropdownMenuItems>
                </Menu>
            </FilterTray>
        </>
    )
}
