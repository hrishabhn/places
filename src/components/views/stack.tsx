export function PageStack({children}: {children?: React.ReactNode}) {
    return (
        <div className="min-h-screen">
            <div className="grid auto-cols-auto grid-flow-row gap-6 py-6 sm:gap-8 sm:py-8">{children}</div>
        </div>
    )
}
