import {type AspectRatio, getAspectClass} from './model'

import Image from 'next/image'
import {type ReactEventHandler} from 'react'

type SimpleImageProps = {
    src: string
    aspect?: AspectRatio
    preload?: boolean
    onError?: ReactEventHandler<HTMLImageElement>
}

export function SimpleImage({src, aspect, preload, onError}: SimpleImageProps) {
    if (aspect !== undefined)
        return (
            <SimpleImageContainer aspect={aspect}>
                <SimpleImage src={src} preload={preload} onError={onError} />
            </SimpleImageContainer>
        )

    return <Image src={src} alt="Simple Image" className="size-full object-cover object-center" fill={true} unoptimized preload={preload} onError={onError} />
}

function SimpleImageContainer({aspect, children}: {aspect: AspectRatio; children?: React.ReactNode}) {
    const aspectClass = getAspectClass(aspect)
    return <div className={`relative size-full ${aspectClass}`}>{children}</div>
}
