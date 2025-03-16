'use client'

import {useHomeContext} from '../context'

import {City, ForkKnife, List, Plus, Star, Tag, X} from '@phosphor-icons/react'

import {searchKeywords} from '@/lib/search'

export function HomeInfo() {
    const {top, toggleTop, displayPlace} = useHomeContext()

    return (
        <div className="flex flex-wrap items-center gap-2 py-4">
            <HomeInfoItem>
                <List weight="bold" />
                {`${displayPlace.length} Place${displayPlace.length === 1 ? '' : 's'}`}
            </HomeInfoItem>

            {top && (
                <button onClick={() => toggleTop()} className="active:opacity-60">
                    <HomeInfoItem>
                        <Star weight="fill" />
                        <p>Top</p>
                        <X weight="bold" />
                    </HomeInfoItem>
                </button>
            )}

            <HomeInfoCity />
            <HomeInfoType />
            <HomeInfoTag />
        </div>
    )
}

function HomeInfoCity() {
    const {allCity, query, setQuery, cityIsSelected, selectedCity, toggleSelectedCity} = useHomeContext()

    const suggestedCity = allCity.filter(city => {
        if (cityIsSelected(city)) return false
        if (query.length < 3) return false
        return searchKeywords({query, keywords: [city.name]})
    })

    return (
        <>
            {selectedCity.map(city => (
                <button key={city.id} onClick={() => toggleSelectedCity(city)} className="active:opacity-60">
                    <HomeInfoItem>
                        <City weight="duotone" />
                        <p>{city.name}</p>
                        <X weight="bold" />
                    </HomeInfoItem>
                </button>
            ))}

            {suggestedCity.map(city => (
                <button
                    key={city.id}
                    onClick={() => {
                        toggleSelectedCity(city)
                        setQuery('')
                    }}
                    className="active:opacity-60"
                >
                    <HomeInfoItem active>
                        <City weight="duotone" />
                        <p>{city.name}</p>
                        <Plus weight="bold" />
                    </HomeInfoItem>
                </button>
            ))}
        </>
    )
}

function HomeInfoType() {
    const {allType, query, setQuery, typeIsSelected, selectedType, toggleSelectedType} = useHomeContext()

    const suggestedType = allType.filter(type => {
        if (typeIsSelected(type)) return false
        if (query.length < 3) return false
        return searchKeywords({query, keywords: [type.name]})
    })

    return (
        <>
            {selectedType.map(type => (
                <button key={type.id} onClick={() => toggleSelectedType(type)} className="active:opacity-60">
                    <HomeInfoItem>
                        <ForkKnife weight="duotone" />
                        <p>{type.name}</p>
                        <X weight="bold" />
                    </HomeInfoItem>
                </button>
            ))}

            {suggestedType.map(type => (
                <button
                    key={type.id}
                    onClick={() => {
                        toggleSelectedType(type)
                        setQuery('')
                    }}
                    className="active:opacity-60"
                >
                    <HomeInfoItem active>
                        <ForkKnife weight="duotone" />
                        <p>{type.name}</p>
                        <Plus weight="bold" />
                    </HomeInfoItem>
                </button>
            ))}
        </>
    )
}

function HomeInfoTag() {
    const {allTags, query, setQuery, tagIsSelected, selectedTags, toggleSelectedTag} = useHomeContext()

    const suggestedTags = allTags.filter(tag => {
        if (tagIsSelected(tag)) return false
        if (query.length < 3) return false
        return searchKeywords({query, keywords: [tag.name]})
    })

    return (
        <>
            {selectedTags.map(tag => (
                <button key={tag.id} onClick={() => toggleSelectedTag(tag)} className="active:opacity-60">
                    <HomeInfoItem>
                        <Tag weight="duotone" />
                        <p>{tag.name}</p>
                        <X weight="bold" />
                    </HomeInfoItem>
                </button>
            ))}

            {suggestedTags.map(tag => (
                <button
                    key={tag.id}
                    onClick={() => {
                        toggleSelectedTag(tag)
                        setQuery('')
                    }}
                    className="active:opacity-60"
                >
                    <HomeInfoItem active>
                        <Tag weight="duotone" />
                        <p>{tag.name}</p>
                        <Plus weight="bold" />
                    </HomeInfoItem>
                </button>
            ))}
        </>
    )
}

function HomeInfoItem({active = false, children}: {active?: boolean; children?: React.ReactNode}) {
    return (
        <div
            className={`flex items-center gap-1.5 rounded-full border-2 px-2 py-1 text-sm font-bold ${active ? 'border-transparent bg-accent text-white' : 'border-accent/20 bg-accent/10 text-accent'}`}
        >
            {children}
        </div>
    )
}
