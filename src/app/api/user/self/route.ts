import { NextResponse } from 'next/server';

const REAL_API_URL = process.env.NEXT_PUBLIC_API_URL as string; // The real backend API URL

export async function GET(request: Request) {
    try {
        // Get the Authorization header
        const authHeader = request.headers.get("authorization");

        if (!authHeader) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Fetch data from the real backend API
        const res = await fetch(`${REAL_API_URL}/api/user/self`, {
            method: "GET",
            headers: {
                "Authorization": authHeader, // Forward the authorization header
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            return NextResponse.json({ error: "Failed to fetch user data" }, { status: res.status });
        }

        const data = await res.json();

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}