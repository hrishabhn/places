'use client'

import {useState} from 'react'

import {Heading, PageSection} from '@/components/layout'
import {stringComboboxReducers} from '@/components/shared'
import {DateInput, DropdownCombobox, NumberInput, TextInput} from '@/components/ui'

const allPeople = ['Tom Cook', 'Wade Cooper', 'Tanya Fox', 'Arlene Mccoy', 'Devon Webb'] as const
type Person = (typeof allPeople)[number]

export function FormExample() {
    const [text, setText] = useState<string>('')
    const [number, setNumber] = useState<number>(0)
    const [date, setDate] = useState<string>('')
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(allPeople[0])

    return (
        <PageSection>
            <Heading size="h1">Form</Heading>
            <div className="space-y-4">
                <TextInput type="text" placeholder="Text" value={text} setValue={setText} />
                <TextInput type="multilineText" placeholder="Multiline Text" value={text} setValue={setText} />
                <TextInput type="url" placeholder="URL" value={text} setValue={setText} />
                <TextInput type="email" placeholder="Email" value={text} setValue={setText} />
                <TextInput type="password" placeholder="Password" value={text} setValue={setText} />

                <NumberInput placeholder="Number" value={number} setValue={setNumber} />

                <DateInput placeholder="Date" value={date} setValue={setDate} />

                <DropdownCombobox placeholder="Select Person" value={selectedPerson} setValue={setSelectedPerson} options={allPeople} {...stringComboboxReducers} />
            </div>
        </PageSection>
    )
}
