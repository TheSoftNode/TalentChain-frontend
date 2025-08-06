"use client";

import { useEffect, useState } from "react";
import { DashboardContent } from "@/components/dashboard/dashboard-content";
import { useHederaWallet } from "@/hooks/useHederaWallet";
import { DashboardStats, SkillTokenInfo } from "@/lib/types/wallet";

interface DashboardPageProps { }

// Mock data - will be replaced with real API calls
const mockStats: DashboardStats = {
  totalSkillTokens: 8,
  totalJobPools: 12,
  activeApplications: 3,
  completedMatches: 2,
  reputationScore: 87,
};

const mockSkillTokens: SkillTokenInfo[] = [
  {
    tokenId: 1,
    category: "React Development",
    level: 8,
    uri: "ipfs://...",
    owner: "0.0.123456"
  },
  {
    tokenId: 2,
    category: "Smart Contracts",
    level: 6,
    uri: "ipfs://...",
    owner: "0.0.123456"
  },
  {
    tokenId: 3,
    category: "UI/UX Design",
    level: 7,
    uri: "ipfs://...",
    owner: "0.0.123456"
  },
  {
    tokenId: 4,
    category: "TypeScript",
    level: 9,
    uri: "ipfs://...",
    owner: "0.0.123456"
  },
  {
    tokenId: 5,
    category: "Solidity",
    level: 5,
    uri: "ipfs://...",
    owner: "0.0.123456"
  },
];

export default function DashboardPage({ }: DashboardPageProps) {
  const { wallet, isConnected } = useHederaWallet();
  const [stats, setStats] = useState<DashboardStats>(mockStats);
  const [skillTokens, setSkillTokens] = useState<SkillTokenInfo[]>(mockSkillTokens);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isConnected && wallet) {
      // TODO: Fetch real data from backend
      fetchDashboardData();
    }
  }, [isConnected, wallet]);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with real API calls
      // const userStats = await getUserStats(wallet.accountId);
      // const userSkills = await getUserSkillTokens(wallet.accountId);
      // setStats(userStats);
      // setSkillTokens(userSkills);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // if (!isConnected) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
  //       <div className="flex items-center justify-center min-h-screen">
  //         <div className="w-full max-w-md mx-4 p-8 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
  //           <div className="text-center">
  //             <div className="w-16 h-16 bg-gradient-to-br from-hedera-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
  //               <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  //               </svg>
  //             </div>
  //             <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
  //               Connect Your Wallet
  //             </h2>
  //             <p className="text-slate-600 dark:text-slate-400 mb-6">
  //               Connect your wallet to access your TalentChain Pro dashboard
  //             </p>
  //             <p className="text-sm text-slate-500 dark:text-slate-500">
  //               You need to connect a Hedera-compatible wallet to view your skills, applications, and manage your professional profile.
  //             </p>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-hedera-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-slate-400">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <DashboardContent
      stats={stats}
      skillTokens={skillTokens}
      applications={[]}
    />
  );
}