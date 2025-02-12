import { NextResponse } from 'next/server';

const REAL_API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export async function GET(request: Request, { params }: { params: Promise<{ username: string }> }) {

    try {
        const slug = (await params).username

        const res = await fetch(`${REAL_API_URL}/api/user/username/${slug}`, {
            method: "GET",
            headers: {
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