'use client'

import {TextInputContainer} from './text'

import {CalendarBlank} from '@phosphor-icons/react'
import * as chrono from 'chrono-node'
import dayjs, {type Dayjs} from 'dayjs'
import {useEffect, useState} from 'react'

import {Heading} from '@/components/layout'

type DateInputProps = {
    placeholder?: string
    value: string
    setValue: (value: string) => void
}

const readableDateFormat = 'D MMM YYYY'
const isoDateFormat = 'YYYY-MM-DD'

export function DateInput({placeholder, value, setValue}: DateInputProps) {
    const [textValue, setTextValue] = useState<string>('')

    useEffect(() => {
        setTextValue(value ? dayjs(value).format(readableDateFormat) : '')
    }, [value])

    const parsedDate: Dayjs | undefined = (() => {
        const chronoDate = chrono.parseDate(textValue)
        if (!chronoDate) return undefined
        return dayjs(chronoDate)
    })()

    const matchingDates: boolean = (() => {
        if (textValue === '' && parsedDate === undefined) return true
        if (parsedDate?.format(isoDateFormat) === value) return true
        return false
    })()

    return (
        <>
            <TextInputContainer icon={CalendarBlank}>
                <input
                    type="text"
                    placeholder={placeholder}
                    value={textValue}
                    onChange={e => setTextValue(e.target.value)}
                    onBlur={() => {
                        if (matchingDates) return
                        if (parsedDate === undefined) return setValue('')
                        setValue(parsedDate.format(isoDateFormat))
                    }}
                    className="flex-1 bg-transparent py-2 outline-none disabled:text-g-500"
                />
                {!matchingDates && (
                    <Heading size="h5" withoutPadding>
                        {parsedDate?.format('D MMM YYYY') ?? '-'}
                    </Heading>
                )}
            </TextInputContainer>
        </>
    )
}
