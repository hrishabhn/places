export function GridStack({children}: {children?: React.ReactNode}) {
    return <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4 pb-4">{children}</div>
}
