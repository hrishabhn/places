import {Heading, PageSection} from '@/components/layout'
import {Button, ButtonTray, TooltipText} from '@/components/ui'

export function TooltipExample() {
    return (
        <PageSection>
            <Heading size="h1">Tooltip</Heading>
            <ButtonTray>
                {(['left', 'center', 'right'] as const).map(align => (
                    <TooltipText key={align} align={align} text="This is a tooltip">
                        <Button size="md">
                            <p className="min-w-48">Tooltip ({align})</p>
                        </Button>
                    </TooltipText>
                ))}
            </ButtonTray>
        </PageSection>
    )
}
