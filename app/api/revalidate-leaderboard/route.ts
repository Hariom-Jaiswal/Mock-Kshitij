import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// Webhook endpoint for Google Sheets to trigger leaderboard updates
// This allows instant updates instead of waiting for the 5-min cache to expire

export async function POST(request: NextRequest) {
    try {
        // Optional: Add authentication to prevent abuse
        const authHeader = request.headers.get('authorization');
        const secret = process.env.REVALIDATE_SECRET;

        if (secret && authHeader !== `Bearer ${secret}`) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Revalidate the leaderboard page
        revalidatePath('/leaderboard');

        return NextResponse.json({
            revalidated: true,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Revalidation error:', error);
        return NextResponse.json(
            { error: 'Failed to revalidate' },
            { status: 500 }
        );
    }
}
