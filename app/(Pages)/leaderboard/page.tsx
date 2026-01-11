import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import LeaderboardPage from "@/app/(Pages)/leaderboard/LeaderboardPage";
import { getLeaderboard } from "@/app/actions/getLeaderboard";

// PURE ON-DEMAND REVALIDATION:
// 1. Page is built ONCE and cached forever (Infinite Cache)
// 2. ONLY updates when the Webhook is called
// Result: 0 Edge Requests from visitors. 1 Request only when you edit the sheet.
export const dynamic = 'force-static';

export default async function Page() {
    // Fetch on the server (Cached Indefinitely until revalidated)
    const result = await getLeaderboard();
    const leaderboard = result.success ? result.data || [] : [];
    const error = result.success ? null : result.error || "Failed to load";

    return (
        <main className="min-h-screen bg-[#0f2a35] text-white selection:bg-amber-500/30">
            <Navbar />
            <LeaderboardPage initialData={leaderboard} initialError={error} />
            <Footer />
        </main>
    );
}