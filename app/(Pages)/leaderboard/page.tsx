import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import LeaderboardPage from "@/app/(Pages)/leaderboard/LeaderboardPage";
import { getLeaderboard } from "@/app/actions/getLeaderboard";

// ON-DEMAND + ISR BACKUP:
// 1. Revalidates every 10 minutes (Safety Net)
// 2. ALSO updates instantly when Webhook is called
export const revalidate = 600;

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