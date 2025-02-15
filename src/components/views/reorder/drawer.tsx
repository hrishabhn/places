import {ReorderGroup} from './group'
import {type ReorderDrawerProps} from './types'

import {type Identifiable} from '@/lib/types'

import {Drawer} from '@/components/ui'

export function ReorderDrawer<T extends Identifiable>({isOpen, onClose, title = 'Reorder', subtitle, ...props}: ReorderDrawerProps<T>) {
    return (
        <Drawer open={isOpen} onClose={onClose} title={title} subtitle={subtitle}>
            <ReorderGroup {...props} />
        </Drawer>
    )
}
