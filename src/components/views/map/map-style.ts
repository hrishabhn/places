'use client'

import {useMediaQuery} from 'usehooks-ts'

export function useMapStyle(): string {
    const isDark = useMediaQuery('(prefers-color-scheme: dark)')
    return `https://tiles.stadiamaps.com/styles/alidade_smooth${isDark ? '_dark' : ''}.json`
}
