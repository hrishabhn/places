export function MenuBarTray({children}: {children?: React.ReactNode}) {
    return <div className="flex items-center gap-2 overflow-x-scroll px-4 text-nowrap sm:px-10">{children}</div>
}
