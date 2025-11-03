import {type AspectRatio, getAspectClass} from './model'

import Image from 'next/image'
import {type ReactEventHandler} from 'react'

import {isAllowedImageHost} from '@/model/image'

type SimpleImageProps = {
    src: string
    aspect?: AspectRatio
    onError?: ReactEventHandler<HTMLImageElement>
}

export function SimpleImage({src, aspect, onError}: SimpleImageProps) {
    if (aspect !== undefined)
        return (
            <SimpleImageContainer aspect={aspect}>
                <SimpleImage src={src} onError={onError} />
            </SimpleImageContainer>
        )

    return <Image src={src} alt="Simple Image" className="size-full object-cover object-center" fill={true} unoptimized={!isAllowedImageHost(src)} onError={onError} />
}

function SimpleImageContainer({aspect, children}: {aspect: AspectRatio; children?: React.ReactNode}) {
    const aspectClass = getAspectClass(aspect)
    return <div className={`relative size-full ${aspectClass}`}>{children}</div>
}
