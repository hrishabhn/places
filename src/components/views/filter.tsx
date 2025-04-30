export type ActiveFilter = {
    title: string
    onRemove: () => void
}

export function FilterBar({children}: {children?: React.ReactNode}) {
    return <div className="flex flex-wrap items-center gap-2 border-b border-line bg-layer-1 px-4 py-3 sm:px-10 dark:border-line-dark dark:bg-layer-1-dark">{children}</div>
}

export function InfoBar({children}: {children?: React.ReactNode}) {
    return <div className="flex items-center py-4">{children}</div>
}
