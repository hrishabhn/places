import {ButtonExample} from './views/button'
import {CalloutExample} from './views/callout'
import {ColorsExample} from './views/colors'
import {DrawerExample} from './views/drawer'
import {FormExample} from './views/form'
import {HeadingExample} from './views/heading'
import {LoadingExample} from './views/loading'
import {MenuExample} from './views/menu'
import {TableExample} from './views/table'
import {ThemesExample} from './views/themes'
import {ToastExample} from './views/toast'
import {TooltipExample} from './views/tooltip'

export default function Home() {
    return (
        <div className="space-y-4 py-4">
            <HeadingExample />
            <ColorsExample />
            <ThemesExample />
            <ButtonExample />
            <MenuExample />
            <FormExample />
            <CalloutExample />
            <TooltipExample />
            <DrawerExample />
            <TableExample />
            <ToastExample />
            <LoadingExample />
        </div>
    )
}
