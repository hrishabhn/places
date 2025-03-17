'use client'

import {CheckCircle, Info, Spinner, WarningCircle} from '@phosphor-icons/react'
import {toast} from 'react-toastify'

type ToastTheme = 'info' | 'success' | 'warning' | 'error' | 'loading'
type ToastProps = {
    theme?: ToastTheme
    title: string
    subtitle?: string
}

function ToastIcon({theme}: {theme: ToastTheme}) {
    switch (theme) {
        case 'info':
            return <Info weight="fill" size={20} className="text-indigo-500" />
        case 'success':
            return <CheckCircle weight="fill" size={20} className="text-green-500" />
        case 'warning':
            return <WarningCircle weight="fill" size={20} className="text-yellow-500" />
        case 'error':
            return <WarningCircle weight="fill" size={20} className="text-red-500" />
        case 'loading':
            return <Spinner weight="bold" size={20} className="animate-spin text-accent dark:text-accent-dark" />
        default:
            throw new Error('Invalid toast theme')
    }
}

function Toast({theme, title, subtitle}: ToastProps) {
    return (
        <div className="flex items-center gap-2">
            {theme && <ToastIcon theme={theme} />}
            <div>
                <p>{title}</p>
                {subtitle ? <p className="text-xs opacity-60">{subtitle}</p> : null}
            </div>
        </div>
    )
}

export const showToast = ({theme, title, subtitle}: ToastProps) => toast(<Toast theme={theme} title={title} subtitle={subtitle} />)
