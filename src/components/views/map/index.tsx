'use client'

import dynamic from 'next/dynamic'

export const MapView = dynamic(() => import('./content').then(mod => mod.MapViewContent), {ssr: false})
