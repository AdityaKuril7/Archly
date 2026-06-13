import {NextResponse} from "next/server";


export async function ErrorHandler(message: string, status: number = 500) {
    return NextResponse.json({
        success: false,
        message: message,
    }, {status: status})
}