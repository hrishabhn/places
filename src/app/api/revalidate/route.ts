import {revalidateTag} from 'next/cache'
import {NextResponse} from 'next/server'

export async function GET() {
    try {
        revalidateTag('notion')
        return NextResponse.json({message: 'Success'}, {status: 200})
    } catch {
        return NextResponse.json({message: 'Error'}, {status: 500})
    }
}
