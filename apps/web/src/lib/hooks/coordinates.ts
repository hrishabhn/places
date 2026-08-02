import {getCoordinates} from '../coordinates'

import {useQuery} from '@tanstack/react-query'

export function useCoordinates() {
    return useQuery({
        queryKey: ['userCoordinates'],
        queryFn: getCoordinates,
    })
}
