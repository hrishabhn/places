'use client'

import {useHomeContext} from '../context'

import {City, ForkKnife, Tag} from '@phosphor-icons/react'

import {notionColorToTheme} from '@/lib/notion/color'

import {DropdownDivider, DropdownMenuItem, DropdownMenuItems, FilterItem, FilterSearch, FilterTray, Menu, MenuButton} from '@/components/ui'

export function HomeFilter() {
    const {
        allCity,
        allType,
        allTags,

        query,
        setQuery,

        selectedCity,
        selectedType,
        selectedTags,

        toggleSelectedCity,
        toggleSelectedType,
        toggleSelectedTag,

        clearSelectedCity,
        clearSelectedType,
        clearSelectedTags,

        displayPlace,
    } = useHomeContext()

    return (
        <>
            <FilterTray>
                <Menu>
                    <MenuButton className="active:opacity-60">
                        <FilterItem active={selectedCity.length > 0}>
                            <City weight="duotone" />
                            <p>{selectedCity.length > 0 ? selectedCity.map(({name}) => name).join(', ') : 'City'}</p>
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
                                active={selectedCity.map(({id}) => id).includes(city.id)}
                            />
                        ))}
                    </DropdownMenuItems>
                </Menu>

                <Menu>
                    <MenuButton className="active:opacity-60">
                        <FilterItem active={selectedType.length > 0}>
                            <ForkKnife weight="duotone" />
                            <p>{selectedType.length > 0 ? selectedType.map(({name}) => name).join(', ') : 'Type'}</p>
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
                                active={selectedType.map(({id}) => id).includes(type.id)}
                            />
                        ))}
                    </DropdownMenuItems>
                </Menu>

                <Menu>
                    <MenuButton className="active:opacity-60">
                        <FilterItem active={selectedTags.length > 0}>
                            <Tag weight="duotone" />
                            <p>{selectedTags.length > 0 ? selectedTags.map(({name}) => name).join(', ') : 'Tags'}</p>
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
                                active={selectedTags.map(({id}) => id).includes(tag.id)}
                            />
                        ))}
                    </DropdownMenuItems>
                </Menu>

                <div className="grow" />

                <FilterItem>
                    {displayPlace.length} {displayPlace.length === 1 ? 'Place' : 'Places'}
                </FilterItem>

                <FilterSearch value={query} setValue={setQuery} />
            </FilterTray>
        </>
    )
}
