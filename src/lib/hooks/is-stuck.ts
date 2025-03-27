import {useIntersectionObserver} from 'usehooks-ts'

export function useIsStuck() {
    const {isIntersecting, ref} = useIntersectionObserver({
        threshold: 1,
        rootMargin: '-1px 0px 0px 0px',
        initialIsIntersecting: true,
    })

    return {isStuck: !isIntersecting, ref}
}
