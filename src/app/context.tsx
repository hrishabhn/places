'use client'

import {revalidateNotion} from './action'

import {type PlaceComplete} from '@/model/types'
import {parseAsArrayOf, parseAsString, useQueryState} from 'nuqs'
import {createContext, useCallback, useContext, useEffect, useMemo} from 'react'

import {kebabify} from '@/lib/kebab'
import {type NotionSelect} from '@/lib/notion/types'
import {searchKeywords} from '@/lib/search'

type HomeContext = {
    allCity: NotionSelect[]
    allType: NotionSelect[]
    allTags: NotionSelect[]

    query: string
    setQuery: (query: string) => void

    selectedCity: NotionSelect[]
    selectedType: NotionSelect[]
    selectedTags: NotionSelect[]

    toggleSelectedCity: (city: NotionSelect) => void
    toggleSelectedType: (type: NotionSelect) => void
    toggleSelectedTag: (tag: NotionSelect) => void

    clearSelectedCity: () => void
    clearSelectedType: () => void
    clearSelectedTags: () => void

    displayPlace: PlaceComplete[]
}

const HomeContext = createContext<HomeContext | null>(null)

export function HomeContextProvider({
    allPlace,
    allCity,
    allType,
    allTags,
    children,
}: {
    allPlace: PlaceComplete[]
    allCity: NotionSelect[]
    allType: NotionSelect[]
    allTags: NotionSelect[]
    children?: React.ReactNode
}) {
    const [query, setQuery] = useQueryState('q', parseAsString.withDefault(''))

    const [selectedCityParam, setSelectedCityParam] = useQueryState('city', parseAsArrayOf(parseAsString).withDefault([]))
    const [selectedTypeParam, setSelectedTypeParam] = useQueryState('type', parseAsArrayOf(parseAsString).withDefault([]))
    const [selectedTagsParam, setSelectedTagsParam] = useQueryState('tags', parseAsArrayOf(parseAsString).withDefault([]))

    const cityIsSelected = useCallback((city: NotionSelect) => selectedCityParam.includes(kebabify(city.name)), [selectedCityParam])
    const typeIsSelected = useCallback((type: NotionSelect) => selectedTypeParam.includes(kebabify(type.name)), [selectedTypeParam])
    const tagIsSelected = useCallback((tag: NotionSelect) => selectedTagsParam.includes(kebabify(tag.name)), [selectedTagsParam])

    const selectedCity = useMemo(() => allCity.filter(cityIsSelected), [allCity, cityIsSelected])
    const selectedType = useMemo(() => allType.filter(typeIsSelected), [allType, typeIsSelected])
    const selectedTags = useMemo(() => allTags.filter(tagIsSelected), [allTags, tagIsSelected])

    const toggleSelectedCity = useCallback(
        (city: NotionSelect) => setSelectedCityParam(cityIsSelected(city) ? selectedCityParam.filter(c => c !== kebabify(city.name)) : [...selectedCityParam, kebabify(city.name)]),
        [cityIsSelected, selectedCityParam, setSelectedCityParam]
    )
    const toggleSelectedType = useCallback(
        (type: NotionSelect) => setSelectedTypeParam(typeIsSelected(type) ? selectedTypeParam.filter(t => t !== kebabify(type.name)) : [...selectedTypeParam, kebabify(type.name)]),
        [typeIsSelected, selectedTypeParam, setSelectedTypeParam]
    )
    const toggleSelectedTag = useCallback(
        (tag: NotionSelect) => setSelectedTagsParam(tagIsSelected(tag) ? selectedTagsParam.filter(t => t !== kebabify(tag.name)) : [...selectedTagsParam, kebabify(tag.name)]),
        [tagIsSelected, selectedTagsParam, setSelectedTagsParam]
    )

    const clearSelectedCity = useCallback(() => setSelectedCityParam([]), [setSelectedCityParam])
    const clearSelectedType = useCallback(() => setSelectedTypeParam([]), [setSelectedTypeParam])
    const clearSelectedTags = useCallback(() => setSelectedTagsParam([]), [setSelectedTagsParam])

    const displayPlace = useMemo(
        () =>
            allPlace
                .filter(place => (selectedCity.length ? cityIsSelected(place.city) : true))
                .filter(place => (selectedType.length ? place.type.some(typeIsSelected) : true))
                .filter(place => (selectedTags.length ? place.tags.some(tagIsSelected) : true))
                .filter(place =>
                    query
                        ? searchKeywords({
                              query,
                              keywords: [place.name, place.city.name, ...place.type.map(({name}) => name), ...place.tags.map(({name}) => name)],
                          })
                        : true
                ),
        [allPlace, selectedCity, selectedType, selectedTags, cityIsSelected, typeIsSelected, tagIsSelected, query]
    )

    useEffect(() => {
        revalidateNotion()
    }, [])

    return (
        <HomeContext.Provider
            value={{
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
            }}
        >
            {children}
        </HomeContext.Provider>
    )
}

export function useHomeContext() {
    const context = useContext(HomeContext)
    if (!context) throw new Error('useHomeContext must be used within a HomeContextProvider')
    return context
}
