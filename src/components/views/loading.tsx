'use client'

import {Spinner} from '@phosphor-icons/react'

export function Loading() {
    return (
        <div className="flex w-full flex-col items-center justify-center gap-1 py-36 text-sm text-accent">
            <Spinner weight="bold" size={20} className="animate-spin" />
            <p className="font-semibold">Loading...</p>
        </div>
    )
}
