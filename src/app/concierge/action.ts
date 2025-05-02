'use server'

import OpenAI from 'openai'
import {zodResponseFormat} from 'openai/helpers/zod'
import {type ChatCompletionMessageParam} from 'openai/resources'
import {z} from 'zod'

import {GetRecsFormSchema, type Rec, RecSchema, ValidateKeyFormSchema} from '@/model/ai'

type ValidKey = boolean | null

export const validateKey = async (currentState: ValidKey, formData: FormData): Promise<ValidKey> => {
    // parse form data
    const {apiKey} = ValidateKeyFormSchema.parse(Object.fromEntries(formData))

    // init client
    const openai = new OpenAI({apiKey})

    try {
        // get models
        await openai.models.list()
        return true
    } catch {
        return false
    }
}

export const getRecs = async (currentState: Rec[], formData: FormData): Promise<Rec[]> => {
    // parse form data
    const {apiKey, dataset, model, city, type, info} = GetRecsFormSchema.parse(Object.fromEntries(formData))

    // init client
    const openai = new OpenAI({apiKey})

    // messages
    const messages: ChatCompletionMessageParam[] = [
        {
            role: 'system',
            content: [
                'You are a travel guide concierge.',
                'Your task is to assist users by providing personalized recommendations based on their preferences.',
                'Users will specify their preferences, which include the city, type of place, and any additional information they wish to share.',
                'Keep in mind that users might use abbreviated or informal city names, so ensure you return the full city name in your response.',
                'If the user specifies an overly specific type of place, offer a more general category in your response while including the specific type as a tag.',
                'Tags should be capitalized (first letter of each word).',
                'Ensure all recommendations reflect real-world options and return between three and five recommendations.',
            ].join(' '),
        },
    ]

    // @TODO: migrate to SQL
    // taste message
    if (dataset !== 'none') {
        // messages.push({
        //     role: 'system',
        //     content: await getTaste({apiKey, model, top: dataset === 'top'}),
        // })
    }

    // user message
    messages.push({
        role: 'user',
        content: [`City: ${city}`, `Type: ${type}`, ...(info && [`Additional Information: ${info}`])].join('\n'),
    })

    // get completion
    const completion = await openai.beta.chat.completions.parse({
        model,
        messages,
        response_format: zodResponseFormat(z.object({recomendations: z.array(RecSchema)}), 'Recomendations'),
    })

    const recs = completion.choices[0].message.parsed?.recomendations
    if (!recs) throw new Error('Failed to get recommendations')
    console.log('Recs', recs)
    return recs
}

// const getTaste = async ({apiKey, model, top}: {apiKey: string; model: string; top: boolean}): Promise<string> => {
//     // get data
//     const allPlace = (await NotionClient.getAllPlace()).filter(place => (top ? place.top : true))

//     // init client
//     const openai = new OpenAI({apiKey})

//     // get completion
//     const completion = await openai.chat.completions.create({
//         model,
//         messages: [
//             // system message
//             {
//                 role: 'system',
//                 content: [
//                     'You are a travel guide concierge.',
//                     'Your task is to convert a database of user places into a brief description of the taste of the user.',
//                     'Do not include any specific details about the places, such as names or locations.',
//                     'Instead, focus on the overall experience and atmosphere of the places.',
//                     'Provide a decsription in the third person.',
//                 ].join(' '),
//             },

//             // user message
//             {role: 'user', content: `Database: ${allPlace}`},
//         ],
//     })

//     const taste = completion.choices[0].message.content
//     if (!taste) throw new Error('Failed to get taste')
//     console.log('Taste', taste)
//     return taste
// }
