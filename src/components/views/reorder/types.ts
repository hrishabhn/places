type Property = {label: string; value: string | undefined}

// shared
type GetProperties<T> = (value: T) => Property[]

// item
export type ReorderItemProps<T> = {
    value: T

    getProperties: GetProperties<T>
}

// group
export type ReorderGroupProps<T> = {
    initialValues: T[]
    onSave: (values: T[]) => void | Promise<void>

    getProperties: GetProperties<T>
}

// drawer
export type ReorderDrawerProps<T> = {
    isOpen: boolean
    onClose: () => void
    title?: string
    subtitle?: string
} & ReorderGroupProps<T>
