import {SpinnerIcon, WarningIcon} from '@phosphor-icons/react/ssr'

function State({state, message}: {state: 'loading' | 'error'; message: string}) {
    const colorClass = {
        loading: 'text-accent-dark dark:text-accent-light',
        error: 'text-red-500',
    }[state]

    const Icon = {
        loading: SpinnerIcon,
        error: WarningIcon,
    }[state]

    const iconClass = {
        loading: 'animate-spin',
        error: '',
    }[state]

    return (
        <div className={`flex w-full items-center justify-center gap-1 py-24 ${colorClass}`}>
            <Icon className={`text-xl ${iconClass}`} weight="bold" />
            <p className="text-sm font-semibold">{message}</p>
        </div>
    )
}

export const LoadingView = ({message = 'Loading'}: {message?: string}) => <State state="loading" message={message} />
export const ErrorView = ({message = 'Error'}: {message?: string}) => <State state="error" message={message} />
