import slugify from 'slugify'

export const kebabCase = (str: string) => slugify(str, {lower: true})
