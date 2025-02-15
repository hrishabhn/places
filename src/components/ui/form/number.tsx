'use client'

import {TextInputContainer} from './text'

import {Hash} from '@phosphor-icons/react'
import {type ChangeEventHandler} from 'react'

import {inputDebounce} from '@/lib/debounce'

import {type InputProps} from '@/components/shared'

type NumberInputProps = {
    placeholder?: string
    name?: string
    required?: boolean
    debounce?: boolean
} & InputProps<number>

export function NumberInput({placeholder, name, required, debounce = false, defaultValue, value, setValue}: NumberInputProps) {
    const onChange: ChangeEventHandler<HTMLInputElement> | undefined = (() => {
        if (setValue === undefined) return undefined
        const eventHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = e => setValue(Number(e.target.value))
        return debounce ? inputDebounce(eventHandler) : eventHandler
    })()

    return (
        <TextInputContainer icon={Hash}>
            <input
                type="number"
                placeholder={placeholder}
                required={required}
                name={name}
                defaultValue={defaultValue || ''}
                value={value}
                onChange={onChange}
                onWheel={e => e.currentTarget.blur()}
                className="flex-1 bg-transparent py-2 outline-none disabled:text-g-500"
            />
        </TextInputContainer>
    )
}
