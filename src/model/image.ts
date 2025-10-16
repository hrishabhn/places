export const allowedImageHosts = [
    // base
    'images.unsplash.com',
    'images.lumacdn.com',
    // places
    'dynamic-media-cdn.tripadvisor.com',
    'media.timeout.com',
    'images.squarespace-cdn.com',
    'assets.simpleviewinc.com',
    'res.cloudinary.com',
    'upload.wikimedia.org',
]

export const isAllowedImageHost = (url: string | null): boolean => {
    if (!url) return false
    const urlObject = new URL(url)
    return allowedImageHosts.includes(urlObject.hostname)
}
