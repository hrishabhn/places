export function GridStack({children}: {children?: React.ReactNode}) {
    return <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-x-4 gap-y-8">{children}</div>
}
