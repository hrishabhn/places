type ControlledInputProps<T> = {
    defaultValue?: never
    value: T

    setValue: (newValue: T) => void
}
type UncontrolledInputProps<T> = {
    defaultValue?: T
    value?: never

    setValue?: (newValue: T) => void
}

export type InputProps<T> = ControlledInputProps<T> | UncontrolledInputProps<T>
