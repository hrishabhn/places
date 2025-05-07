'use client'

import {useEffect, useState} from 'react'

type TypeWordsProps = {
    text: string
    words: string[]
}

export function TypeWords({text, words}: TypeWordsProps) {
    const [state, setState] = useState<'typing' | 'complete' | 'deleting'>('typing')
    const [wordIndex, setWordIndex] = useState<number>(0)
    const [typedText, setTypedText] = useState<string>('')

    useEffect(() => {
        if (!words.length) return

        const currentWord = words[wordIndex]

        const handleTyping = () => {
            setTypedText(prev => {
                switch (state) {
                    // typing state
                    case 'typing':
                        // complete word
                        if (prev === currentWord) {
                            setState('complete')
                            return prev
                        }

                        // type
                        return currentWord.substring(0, prev.length + 1)

                    // deleting state
                    case 'deleting':
                        // deleted word
                        if (prev.length === 0) {
                            setState('typing')
                            setWordIndex((wordIndex + 1) % words.length)
                            return ''
                        }

                        // delete
                        return prev.substring(0, prev.length - 1)

                    // complete state
                    case 'complete':
                        setState('deleting')
                        return prev
                }
            })
        }

        // set interval
        const typingInterval = setInterval(
            handleTyping,
            {
                typing: 150,
                complete: 1500,
                deleting: 50,
            }[state]
        )

        // clear interval
        return () => clearInterval(typingInterval)
    }, [words, wordIndex, state])

    return (
        <div className="flex">
            {text}
            <p className="pl-1 text-accent">{typedText}</p>
            <span className={`${state !== 'complete' ? 'animate-blink' : ''} text-accent`}>|</span>
        </div>
    )
}
