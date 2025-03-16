'use client'

import {useHomeContext} from '../context'
import {PlaceCard} from './card'

import {City, ForkKnife, List, Star, Tag, X} from '@phosphor-icons/react'

export function HomeStack() {
    const {
        displayPlace,

        top,
        toggleTop,

        selectedCity,
        selectedTags,
        selectedType,

        toggleSelectedCity,
        toggleSelectedTag,
        toggleSelectedType,
    } = useHomeContext()
    return (
        <>
            <div className="flex flex-wrap items-center gap-2 py-4">
                <ActiveFilter>
                    <List weight="bold" />
                    {`${displayPlace.length} Place${displayPlace.length === 1 ? '' : 's'}`}
                </ActiveFilter>
                {top && (
                    <button onClick={() => toggleTop()} className="active:opacity-60">
                        <ActiveFilter>
                            <Star weight="fill" />
                            <p>Top</p>
                            <X weight="bold" />
                        </ActiveFilter>
                    </button>
                )}
                {selectedCity.map(city => (
                    <button key={city.id} onClick={() => toggleSelectedCity(city)} className="active:opacity-60">
                        <ActiveFilter>
                            <City weight="duotone" />
                            <p>{city.name}</p>
                            <X weight="bold" />
                        </ActiveFilter>
                    </button>
                ))}
                {selectedType.map(type => (
                    <button key={type.id} onClick={() => toggleSelectedType(type)} className="active:opacity-60">
                        <ActiveFilter>
                            <ForkKnife weight="duotone" />
                            <p>{type.name}</p>
                            <X weight="bold" />
                        </ActiveFilter>
                    </button>
                ))}
                {selectedTags.map(tag => (
                    <button key={tag.id} onClick={() => toggleSelectedTag(tag)} className="active:opacity-60">
                        <ActiveFilter>
                            <Tag weight="duotone" />
                            <p>{tag.name}</p>
                            <X weight="bold" />
                        </ActiveFilter>
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4 pb-4">
                {displayPlace.map(place => (
                    <PlaceCard key={place.id} place={place} />
                ))}
            </div>
        </>
    )
}

function ActiveFilter({children}: {children?: React.ReactNode}) {
    return <div className="flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1.5 text-sm font-bold text-accent">{children}</div>
}
