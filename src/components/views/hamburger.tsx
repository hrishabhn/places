type HamburgerIconLineProps = {
    open: boolean
    type: 'top' | 'middle' | 'bottom'
}

function HamburgerIconLine({open, type}: HamburgerIconLineProps) {
    const rotateClass = {
        top: 'rotate-45',
        middle: '-rotate-45',
        bottom: '-rotate-45',
    }[type]

    const translateClass = {
        top: 'translate-y-[-7px]',
        middle: '',
        bottom: 'translate-y-[7px]',
    }[type]

    return <div className={`absolute h-0.5 w-full rounded-full bg-current transition-all duration-300 ease-in-out ${open ? rotateClass : translateClass}`} />
}

export function HamburgerIcon({open}: {open: boolean}) {
    return (
        <div className="relative flex size-6 items-center justify-center">
            <HamburgerIconLine open={open} type="top" />
            <HamburgerIconLine open={open} type="middle" />
            <HamburgerIconLine open={open} type="bottom" />
        </div>
    )
}
