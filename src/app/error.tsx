'use client'

import {Warning} from '@phosphor-icons/react'

import {Heading} from '@/components/layout'
import {Button, ButtonTray} from '@/components/ui'
import {Section} from '@/components/views/section'

export default function ErrorPage({error, reset}: {error: Error & {digest?: string}; reset: () => void}) {
    return (
        <Section>
            <div className="flex flex-col items-center justify-center py-24 text-center">
                <Warning weight="fill" size={96} className="pb-4 text-red-500" />
                <Heading size="h4" withoutPadding>
                    Application Error
                </Heading>
                <Heading size="h5" withoutPadding>
                    A server-side exception has occurred (see the server logs for more information).
                </Heading>
                {error.digest && <Heading size="h6">Digest: ${error.digest}</Heading>}
                <div className="h-4" />
                <ButtonTray>
                    <button onClick={reset} className="active:opacity-60">
                        <Button theme="foreground" size="sm" rounded="full" ring>
                            Try again
                        </Button>
                    </button>
                </ButtonTray>
            </div>
        </Section>
    )
}
