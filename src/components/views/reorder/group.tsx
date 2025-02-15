'use client'

import {ReorderItem} from './item'
import {type ReorderGroupProps} from './types'

import {Reorder} from 'motion/react'
import {useEffect, useState} from 'react'

import {type Identifiable} from '@/lib/types'

export function ReorderGroup<T extends Identifiable>({initialValues, onSave, getProperties}: ReorderGroupProps<T>) {
    const [values, setValues] = useState<T[]>(initialValues)

    useEffect(() => {
        onSave(values)
    }, [values, onSave])

    return (
        <Reorder.Group<T> values={values} onReorder={setValues} className="flex flex-col gap-2">
            {values.map(v => (
                <ReorderItem key={v.id} value={v} getProperties={getProperties} />
            ))}
        </Reorder.Group>
    )
}
