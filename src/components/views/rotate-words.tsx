'use client'

import {AnimatePresence, motion} from 'motion/react'
import {useEffect, useState} from 'react'

type RotateWordsProps = {
    text: string
    words: string[]
}

export function RotateWords({text, words}: RotateWordsProps) {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prevIndex => (prevIndex + 1) % words.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [words.length])

    return (
        <div className="flex gap-1">
            {text}
            <AnimatePresence mode="wait">
                <motion.p
                    //
                    key={words[index]}
                    initial={{opacity: 0, y: -10}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: 10}}
                    transition={{duration: 0.5}}
                    className="text-accent"
                >
                    {words[index]}
                </motion.p>
            </AnimatePresence>
        </div>
    )
}
