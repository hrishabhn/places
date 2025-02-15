'use client'

import {TableTextStatic} from './input'
import {TableRow} from './layout'

import {Plus, Trash, Warning} from '@phosphor-icons/react'

import {DropdownHeader, DropdownMenuItem, DropdownMenuItems, Menu, MenuButton} from '@/components/ui'

// index
export function TableIndexHeader() {
    return <div className="w-10 flex-none bg-line dark:bg-line-dark" />
}

type TableIndexProps = {
    index: number
    onDelete?: () => void
}

export function TableIndex({index, onDelete}: TableIndexProps) {
    return (
        <Menu>
            <MenuButton className="flex active:opacity-60">
                <div className="flex h-full w-10 flex-none items-center justify-center bg-layer-1 py-3 text-xs font-medium text-g-500 dark:bg-layer-1-dark">{index}</div>
            </MenuButton>
            <DropdownMenuItems>
                {onDelete ? (
                    <DropdownMenuItem
                        image={{icon: Trash}}
                        title="Delete"
                        action={{
                            onClick: () => {
                                if (confirm('Are you sure you want to delete this item?')) onDelete()
                            },
                        }}
                    />
                ) : (
                    <DropdownHeader text="No Actions" />
                )}
            </DropdownMenuItems>
        </Menu>
    )
}

// warning
function TableWarningCell({children}: {children?: React.ReactNode}) {
    return <div className="flex w-10 flex-none items-center justify-center bg-layer-1 text-sm dark:bg-layer-1-dark">{children}</div>
}

export function TableWarning({showWarning}: {showWarning: boolean}) {
    if (showWarning)
        return (
            <TableWarningCell>
                <Warning weight="duotone" className="text-red-500" />
            </TableWarningCell>
        )

    return <TableWarningCell />
}

// add new
export const TableAddNew = ({onAddNew}: {onAddNew: () => void}) => (
    <button type="button" onClick={() => onAddNew()} className="active:opacity-60">
        <TableRow>
            <div className="flex w-10 flex-none items-center justify-center bg-layer-1 dark:bg-layer-1-dark">
                <Plus weight="bold" className="text-xs text-g-500" />
            </div>
            <TableTextStatic value="Add New" />
        </TableRow>
    </button>
)
