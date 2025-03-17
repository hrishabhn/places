'use client'

import {Envelope, type Icon, Link, Password, TextAa} from '@phosphor-icons/react'
import {type ChangeEventHandler} from 'react'

import {inputDebounce} from '@/lib/debounce'

import {type InputProps} from '@/components/shared'

type TextInputType = 'text' | 'url' | 'email' | 'password'

type TextInputProps = {
    type: TextInputType
    placeholder?: string
    name?: string
    required?: boolean
    debounce?: boolean
} & InputProps<string>

export function TextInput({type = 'text', placeholder, name, required, debounce = false, defaultValue, value, setValue}: TextInputProps) {
    const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined = (() => {
        if (setValue === undefined) return undefined
        const eventHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = e => setValue(e.target.value.trim())
        return debounce ? inputDebounce(eventHandler) : eventHandler
    })()

    return (
        <TextInputContainer
            icon={
                {
                    text: TextAa,
                    multilineText: TextAa,
                    url: Link,
                    email: Envelope,
                    password: Password,
                }[type]
            }
        >
            <input
                type={type}
                placeholder={placeholder}
                required={required}
                name={name}
                defaultValue={defaultValue}
                value={value}
                onChange={onChange}
                className="flex-1 bg-transparent py-2 outline-none disabled:text-g-500"
            />
        </TextInputContainer>
    )
}

export function TextInputContainer({icon, children}: {icon: Icon; children?: React.ReactNode}) {
    const Icon = icon
    return (
        <div className="flex w-full items-center gap-2 rounded-lg bg-layer-1 px-3 text-sm font-medium ring-1 ring-line transition focus-within:ring-2 focus-within:ring-accent dark:bg-layer-1-dark dark:ring-line-dark dark:focus-within:ring-accent-dark">
            <Icon weight="bold" className="text-base opacity-60" />
            {children}
        </div>
    )
}
