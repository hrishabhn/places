'use client'

import {MagnifyingGlass} from '@phosphor-icons/react'

import {Heading, PageSection} from '@/components/layout'
import {Button, ButtonTray, IconButton} from '@/components/ui'

const buttonSize = ['xs', 'sm', 'md', 'lg'] as const

export function ButtonExample() {
    return (
        <>
            <PageSection>
                <Heading size="h1">Text Button</Heading>
                <ButtonTray items="start">
                    {buttonSize.map(size => (
                        <Button key={size} size={size}>
                            Button ({size})
                        </Button>
                    ))}
                </ButtonTray>
            </PageSection>

            <PageSection>
                <Heading size="h1">Icon Button</Heading>
                <ButtonTray items="start">
                    {buttonSize.map(size => (
                        <div key={size}>
                            <IconButton icon={MagnifyingGlass} size={size} />
                        </div>
                    ))}
                </ButtonTray>
            </PageSection>
        </>
    )
}
