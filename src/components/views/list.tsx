import {type Icon} from '@phosphor-icons/react'

export function ListGridStack({children}: {children?: React.ReactNode}) {
    return <div className="grid auto-cols-auto grid-flow-row grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3">{children}</div>
}

export function ListScrollStack({children}: {children?: React.ReactNode}) {
    return (
        <div className="grid snap-x snap-mandatory scroll-px-4 auto-cols-[240px] grid-flow-col grid-rows-3 gap-3 overflow-x-auto px-4 *:snap-start sm:scroll-px-10 sm:px-10">
            {children}
        </div>
    )
}

type ListItemProps = {
    image: React.ReactNode
    title: string
    subtitle?: string
}

export function ListItem({image, title, subtitle}: ListItemProps) {
    return (
        <div className="group grid grid-cols-[auto_1fr] items-center gap-3">
            <div>{image}</div>
            <div>
                <p className="line-clamp-1 font-serif text-base font-semibold group-hover:underline">{title}</p>
                {subtitle ? <p className="line-clamp-1 text-xs font-semibold uppercase opacity-60">{subtitle}</p> : null}
            </div>
        </div>
    )
}

export function ListItemImageContainer({children}: {children?: React.ReactNode}) {
    return <div className="rounded-full bg-accent-dark text-white">{children}</div>
}

export function ListItemIcon({icon: Icon}: {icon: Icon}) {
    return (
        <ListItemImageContainer>
            <div className="flex size-10 items-center justify-center">
                <Icon size={20} />
            </div>
        </ListItemImageContainer>
    )
}
