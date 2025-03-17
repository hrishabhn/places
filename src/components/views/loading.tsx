'use client'

import {Spinner} from '@phosphor-icons/react'

export function LoadingSpinner({text = 'Loading'}: {text?: string}) {
    return (
        <div className="flex w-full flex-col items-center justify-center gap-1 py-12 text-sm text-accent dark:text-accent-dark">
            <Spinner weight="bold" size={20} className="animate-spin" />
            <p className="font-semibold">{text}</p>
        </div>
    )
}
