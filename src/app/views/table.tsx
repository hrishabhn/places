'use client'

import {useState} from 'react'
import useLocalStorageState from 'use-local-storage-state'
import {v4 as uuid} from 'uuid'

import {Heading, PageSection} from '@/components/layout'
import {stringComboboxReducers} from '@/components/shared'
import {Button, ButtonTray} from '@/components/ui'
import {ReorderDrawer} from '@/components/views/reorder'
import {
    TableAddNew,
    TableComboboxInput,
    TableContainer,
    TableHeader,
    TableIndex,
    TableIndexHeader,
    TableNumberInput,
    TableRow,
    TableTextInput,
    TableTextStatic,
} from '@/components/views/table'

const allChargeTypes = ['Rent', 'Utilities', 'Internet'] as const
type ChargeType = (typeof allChargeTypes)[number]
type Charge = {
    id: string
    description: string
    amount: number
    type: ChargeType | null
}

const allCharges: Charge[] = (
    [
        {description: 'Rent', amount: 1000, type: 'Rent'},
        {description: 'Utilities', amount: 200, type: 'Utilities'},
        {description: 'Internet', amount: 50, type: 'Internet'},
    ] as const
).map(charge => ({...charge, id: uuid()}))

export function TableExample() {
    const [all, setAll] = useLocalStorageState<Charge[]>('charges', {defaultValue: allCharges})
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <PageSection fullWidth>
            <Heading size="h1">Table</Heading>
            <ButtonTray>
                <button onClick={() => localStorage.removeItem('charges')} className="active:opacity-60">
                    <Button size="md" rounded="xl" theme="accent">
                        Reset
                    </Button>
                </button>

                <button onClick={() => setIsOpen(true)} className="active:opacity-60">
                    <Button size="md" rounded="xl" theme="accent">
                        Reorder
                    </Button>
                </button>
            </ButtonTray>

            <TableContainer>
                <TableRow>
                    <TableIndexHeader />

                    <TableHeader size="sm" type="text" text="ID" />
                    <TableHeader size="lg" type="text" text="Description" />
                    <TableHeader type="currency" text="Amount" />
                    <TableHeader type="select" text="Type" />
                </TableRow>

                {all.map((charge, i) => (
                    <TableRow key={charge.id}>
                        <TableIndex index={i + 1} onDelete={() => setAll(all.filter(c => c.id !== charge.id))} />

                        <TableTextStatic size="sm" value={charge.id} />
                        <TableTextInput
                            size="lg"
                            value={charge.description}
                            setValue={newValue => setAll(all.map(c => (c.id === charge.id ? {...c, description: newValue} : c)))}
                        />
                        <TableNumberInput value={charge.amount} setValue={newValue => setAll(all.map(c => (c.id === charge.id ? {...c, amount: newValue} : c)))} />
                        <TableComboboxInput<ChargeType>
                            options={allChargeTypes}
                            value={charge.type}
                            setValue={newValue => setAll(all.map(c => (c.id === charge.id ? {...c, type: newValue} : c)))}
                            {...stringComboboxReducers}
                        />
                    </TableRow>
                ))}
                <TableAddNew onAddNew={() => setAll([...all, {id: uuid(), description: '', amount: 0, type: 'Rent'}])} />
            </TableContainer>

            <ReorderDrawer<Charge>
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                initialValues={all}
                onSave={setAll}
                getProperties={charge => [
                    {label: 'Description', value: charge.description},
                    {label: 'Amount', value: charge.amount.toString()},
                ]}
            />

            <div className="h-8" />

            <TableContainer>
                <TableRow>
                    <TableIndexHeader />

                    <TableHeader size="sm" type="text" text="Small" />
                    <TableHeader size="md" type="text" text="Medium" />
                    <TableHeader size="lg" type="text" text="Large" />
                    <TableHeader size="xl" type="text" text="Extra Large" />
                </TableRow>

                <TableRow>
                    <TableIndex index={1} />

                    <TableTextStatic size="sm" value="Small" />
                    <TableTextStatic size="md" value="Medium" />
                    <TableTextStatic size="lg" value="Large" />
                    <TableTextStatic size="xl" value="Extra Large" />
                </TableRow>
            </TableContainer>
        </PageSection>
    )
}
