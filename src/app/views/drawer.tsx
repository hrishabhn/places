'use client'

import {useState} from 'react'

import {Heading, PageSection} from '@/components/layout'
import {Button, Card, Drawer, tailwindColors} from '@/components/ui'

export function DrawerExample() {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <PageSection>
            <Heading size="h1">Drawer</Heading>
            <button onClick={() => setIsOpen(true)} className="active:opacity-60">
                <Button size="lg" theme="accent">
                    Open Drawer
                </Button>
            </button>

            <Drawer open={isOpen} onClose={() => setIsOpen(false)} title="Drawer Example" subtitle="This is a drawer example">
                <div className="space-y-2">
                    {tailwindColors.map(color => (
                        <Card key={color} theme={color} rounded="md">
                            <p className="px-4 py-3 font-medium">{color}</p>
                        </Card>
                    ))}
                </div>
            </Drawer>
        </PageSection>
    )
}
