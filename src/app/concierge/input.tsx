import {type Icon} from '@phosphor-icons/react'

type TextInputProps = {
    icon: Icon
    placeholder: string
    required?: boolean
    name: string
    disabled: boolean
} & (
    | {
          defaultValue?: string
          value?: never
          setValue?: never
      }
    | {
          defaultValue?: never
          value: string
          setValue: (newValue: string) => void
      }
)

export function TextInput({icon, placeholder, required, name, disabled, defaultValue, value, setValue}: TextInputProps) {
    const Icon = icon
    return (
        <div className="flex items-center gap-2 rounded-lg bg-layer-1 px-2.5 ring-1 ring-line transition focus-within:ring-2 focus-within:ring-olive dark:bg-layer-1-dark dark:ring-line-dark dark:focus-within:ring-cream">
            <Icon weight="bold" />
            <input
                type="text"
                placeholder={placeholder}
                required={required}
                name={name}
                disabled={disabled}
                defaultValue={defaultValue}
                value={value}
                onChange={setValue ? e => setValue(e.target.value) : undefined}
                className="flex-1 bg-transparent py-1.5 outline-none disabled:cursor-not-allowed disabled:opacity-60"
            />
        </div>
    )
}
