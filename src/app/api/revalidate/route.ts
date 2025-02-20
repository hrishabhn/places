import {revalidateTag} from 'next/cache'
import {NextResponse} from 'next/server'

async function handler() {
    try {
        revalidateTag('notion')
        return NextResponse.json({message: 'Success'}, {status: 200})
    } catch {
        return NextResponse.json({message: 'Error'}, {status: 500})
    }
}

export const GET = handler
export const POST = handler
