export function MenuBarTray({children}: {children?: React.ReactNode}) {
    return <div className="flex items-center gap-2 overflow-x-scroll text-nowrap px-4 sm:px-10">{children}</div>
}
