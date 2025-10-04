export function PageStack({children}: {children?: React.ReactNode}) {
    return (
        <div className="min-h-screen">
            <div className="grid auto-cols-auto grid-flow-row gap-4 pt-6">{children}</div>
        </div>
    )
}
