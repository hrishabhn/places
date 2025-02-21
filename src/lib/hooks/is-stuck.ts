import {useIntersectionObserver} from 'usehooks-ts'

export function useSticky() {
    const {isIntersecting, ref} = useIntersectionObserver({
        threshold: 1,
        rootMargin: '-1px 0px 0px 0px',
    })

    return {isStuck: !isIntersecting, ref}
}
