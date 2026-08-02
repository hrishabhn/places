'use client'

import {useEffect} from 'react'
import {useIntersectionObserver} from 'usehooks-ts'

export function useOnScreen(onScreen: () => void) {
    const {isIntersecting, ref} = useIntersectionObserver({threshold: 0.1})

    useEffect(() => {
        if (isIntersecting) onScreen()
    }, [isIntersecting, onScreen])

    return ref
}
