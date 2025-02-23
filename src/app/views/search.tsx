'use client'

import {useHomeContext} from '../context'

import {MagnifyingGlass} from '@phosphor-icons/react'
import {useEffect, useState} from 'react'

import {Card} from '@/components/ui'

export function HomeSearch() {
    const {
        query,
        setQuery,

        displayPlace,
    } = useHomeContext()

    return (
        <div className="flex w-full items-center p-4 font-medium sm:px-10">
            <p>{`${displayPlace.length} Place${displayPlace.length === 1 ? '' : 's'}`}</p>
            <div className="grow" />
            <HomeFilter value={query} setValue={setQuery} />
        </div>
    )
}

function HomeFilter({value, setValue}: {value: string; setValue: (value: string) => void}) {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        if (value) setIsOpen(true)
    }, [value])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === '/') {
                e.preventDefault()
                setIsOpen(true)
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [])

    if (!isOpen)
        return (
            <button onClick={() => setIsOpen(true)} className="p-2 active:opacity-60">
                <MagnifyingGlass weight="bold" />
            </button>
        )

    return (
        <Card rounded="xl">
            <div className="flex items-center gap-2 px-2 py-1">
                <MagnifyingGlass weight="bold" className="opacity-60" />
                <input
                    type="search"
                    autoFocus
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onBlur={() => {
                        if (value === '') setIsOpen(false)
                    }}
                    placeholder="Filter"
                    className="bg-transparent outline-none"
                />
            </div>
        </Card>
    )
}
