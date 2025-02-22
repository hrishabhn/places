'use client'

import {parseAsBoolean, useQueryState} from 'nuqs'

// admin mode
type AdminModeState = {
    adminMode: boolean
    toggleAdminMode: () => void
}

export function useAdminMode(): AdminModeState {
    const [adminMode, setAdminMode] = useQueryState('admin', parseAsBoolean.withDefault(false))
    return {adminMode, toggleAdminMode: () => setAdminMode(!adminMode)}
}
