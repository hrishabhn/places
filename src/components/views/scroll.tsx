export function ScrollStack({children}: {children?: React.ReactNode}) {
    return (
        <div className="flex snap-x snap-mandatory scroll-px-4 overflow-x-auto px-4 py-0.5 sm:scroll-px-10 sm:px-10">
            <div className="grid flex-none auto-cols-[320px] grid-flow-col gap-3 sm:auto-cols-[360px] [&>*]:snap-start">{children}</div>
        </div>
    )
}
