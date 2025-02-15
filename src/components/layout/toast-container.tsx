import {ToastContainer} from 'react-toastify'

import {tw} from '@/lib/tailwind'

import {inter} from '@/components/layout'

export function StyledToastContainer() {
    return (
        <ToastContainer
            position="bottom-right"
            closeButton={false}
            hideProgressBar
            closeOnClick
            newestOnTop
            toastClassName={tw`rounded-xl bg-layer-1 text-base font-medium shadow-lg ring-1 ring-line dark:bg-layer-1-dark dark:ring-line-dark ${inter.className}`}
            draggable
        />
    )
}
