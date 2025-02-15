'use client'

import {Heading, PageSection} from '@/components/layout'
import {Button, ButtonTray} from '@/components/ui'
import {showToast} from '@/components/ui/toast'

export function ToastExample() {
    return (
        <PageSection>
            <Heading size="h1">Toast</Heading>

            <ButtonTray>
                <button
                    onClick={() =>
                        showToast({
                            theme: 'success',
                            title: 'Success',
                            subtitle: 'Your action was successful!',
                        })
                    }
                    className="active:opacity-60"
                >
                    <Button size="lg" theme="accent">
                        Show Toast with Icon
                    </Button>
                </button>
            </ButtonTray>
        </PageSection>
    )
}
