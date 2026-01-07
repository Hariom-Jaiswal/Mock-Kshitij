'use server';

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export type LeaderboardEntry = {
    rank: number;
    college: string;
    score: number;
};

export async function getLeaderboard(): Promise<{ success: boolean; data?: LeaderboardEntry[]; error?: string }> {
    try {
        if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
            console.error("Missing Google Sheets credentials");
            return { success: false, error: "Server Configuration Error" };
        }

        const serviceAccountAuth = new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        // Use dedicated Leaderboard Sheet ID if available, otherwise fallback to main sheet
        const sheetId = process.env.LEADERBOARD_SHEET_ID || process.env.GOOGLE_SHEET_ID;

        if (!sheetId) {
            console.error("Missing Google Sheets ID");
            return { success: false, error: "Sheet Configuration Missing" };
        }

        const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);
        await doc.loadInfo();

        // 1. Find "Sheet2" (or fallback to index 1 if not found)
        let sheet = doc.sheetsByTitle['Sheet2'];
        if (!sheet) {
            console.warn("Sheet2 not found, falling back to index 1 or 0");
            sheet = doc.sheetsByIndex[1] || doc.sheetsByIndex[0];
        }

        if (!sheet) {
            return { success: false, error: "Leaderboard Sheet not found" };
        }

        // 2. Load rows
        const rows = await sheet.getRows();

        // 3. Map rows to data
        // Assumption: Columns are "College Name" (or similar) and "Score" (or similar)
        // We will try to find the correct keys dynamically if possible, or assume common names.

        // Let's look at the header values from the sheet to be safe, but getRows() uses the first row as headers.
        // We'll iterate and try to find the college and score.

        const data: { college: string; score: number }[] = [];

        rows.forEach(row => {
            // Flexible key matching
            const rowData = row.toObject();
            const keys = Object.keys(rowData);

            const collegeKey = keys.find(k => /college|name|team/i.test(k));
            const scoreKey = keys.find(k => /score|point|total/i.test(k));

            if (collegeKey && scoreKey) {
                const collegeName = rowData[collegeKey];
                const rawScore = rowData[scoreKey];

                // Parse score (handle "1,000", string numbers, etc.)
                let score = 0;
                if (typeof rawScore === 'number') {
                    score = rawScore;
                } else if (typeof rawScore === 'string') {
                    score = parseFloat(rawScore.replace(/,/g, '')) || 0;
                }

                if (collegeName && !isNaN(score)) {
                    data.push({
                        college: collegeName.trim(),
                        score: score
                    });
                }
            }
        });

        // 4. Sort Descending
        data.sort((a, b) => b.score - a.score);

        // 5. Take Top 10
        const top10 = data.slice(0, 10).map((entry, index) => ({
            rank: index + 1,
            ...entry
        }));

        return { success: true, data: top10 };

    } catch (error) {
        console.error("Fetch Leaderboard Error:", error);
        return { success: false, error: "Failed to fetch leaderboard" };
    }
}
