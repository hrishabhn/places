export type ActiveFilter = {
    title: string
    type: 'country' | 'city' | 'place_type' | 'place_tag'
    onRemove: () => void
}
