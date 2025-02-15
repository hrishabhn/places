import {TableColumn} from '../layout'
import {type TableColumnSize} from '../shared'

import Link from 'next/link'

import {tw} from '@/lib/tailwind'

const sharedClassName = tw`flex w-full items-center whitespace-pre-line bg-layer-1 px-4 py-3 text-sm dark:bg-layer-1-dark`

type TableTextStaticProps = {
    href?: string
    size?: TableColumnSize
    value: string | undefined
}

export function TableTextStatic({href, size, value}: TableTextStaticProps) {
    if (href)
        return (
            <TableColumn size={size}>
                <Link href={href} className={`font-semibold hover:underline active:opacity-60 ${sharedClassName} ${value ? 'text-indigo-600' : 'text-indigo-600/60'}`}>
                    {value || 'Untitled'}
                </Link>
            </TableColumn>
        )

    return (
        <TableColumn size={size}>
            <div className={`font-medium ${sharedClassName} ${value ? '' : 'text-g-500'}`}>{value || '—'}</div>
        </TableColumn>
    )
}
