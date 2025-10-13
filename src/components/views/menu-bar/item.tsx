export function MenuBarItem({active = false, children}: {active?: boolean; children?: React.ReactNode}) {
    return (
        <div
            className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold ${active ? 'bg-accent-dark text-accent-light dark:bg-accent-light dark:text-accent-dark' : 'bg-accent-dark/10 text-accent-dark hover:bg-accent-dark/20 dark:bg-accent-light/10 dark:text-accent-light dark:hover:bg-accent-light/20'}`}
        >
            {children}
        </div>
    )
}
