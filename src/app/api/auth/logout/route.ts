import {NextResponse} from 'next/server';

export async function GET() {
    try {
        const response = NextResponse.json(
            { message: "Logout successful", success: true }
        );
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0) // Set the cookie to expire immediately
        });
        response.cookies.set("role", "", {
            httpOnly: true,
            expires: new Date(0) // Set the cookie to expire immediately
        });
        return response;
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
        
    }
}