'use client'

import {useMedia} from 'react-use'

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

/**
 * @returns {boolean} Returns true if the viewport width matches or exceeds the specified breakpoint, false otherwise.
 */
export function useBreakpoint(breakpoint: Breakpoint): boolean {
    return useMedia(
        {
            sm: '(min-width: 640px)',
            md: '(min-width: 768px)',
            lg: '(min-width: 1024px)',
            xl: '(min-width: 1280px)',
            '2xl': '(min-width: 1536px)',
        }[breakpoint],
        true
    )
}
