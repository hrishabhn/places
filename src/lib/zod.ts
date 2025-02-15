import {type SafeParseReturnType, type z} from 'zod'

type ZodSchema<Input, Output> = z.ZodType<Output, z.ZodTypeDef, Input>

// function
export const zodSafePromise = async <Input, Output>({schema, fn}: {schema: ZodSchema<Input, Output>; fn: () => Promise<unknown>}): Promise<SafeParseReturnType<Input, Output>> => schema.safeParse(await fn())
export const zodPromise = async <Input, Output>({schema, fn}: {schema: ZodSchema<Input, Output>; fn: () => Promise<unknown>}): Promise<Output> => schema.parse(await fn())

// fetch
export const fetchToPromise = async ({url, options}: {url: string; options?: RequestInit}): Promise<unknown> => {
    const response = await fetch(url, options)

    if (!response.ok) {
        console.error(response)
        throw new Error('Fetch Error')
    }

    return await response.json()
}
