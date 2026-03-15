export function MenuBarItem({active = false, children}: {active?: boolean; children?: React.ReactNode}) {
    return (
        <div
            className={`flex items-center gap-2 rounded-full border-2 px-2.5 py-1.5 text-sm font-semibold text-nowrap ${active ? 'border-transparent bg-accent-dark text-accent-light dark:bg-accent-light dark:text-accent-dark' : 'border-transparent bg-accent-dark/10 text-accent-dark dark:bg-accent-light/10 dark:text-accent-light'}`}
        >
            {children}
        </div>
    )
}
