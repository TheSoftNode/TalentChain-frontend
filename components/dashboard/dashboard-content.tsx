"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  Briefcase,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Users
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardStats } from "./dashboard-stats";
import { SkillCard } from "./skill-card";
import { ApplicationCard } from "./application-card";
import { ActivityFeed } from "./activity-feed";
import { QuickActions } from "./quick-actions";
import { NotificationCenter } from "./notification-center";
import { DashboardStats as StatsType, SkillTokenInfo } from "@/lib/types/wallet";

interface DashboardContentProps {
  stats: StatsType;
  skillTokens: SkillTokenInfo[];
  applications: any[];
}

const mockActiveApplications = [
  {
    id: 1,
    company: "DeFi Protocol",
    position: "Senior Frontend Developer",
    salary: "120,000 HBAR",
    status: "Under Review",
    appliedAt: "2024-01-10",
    location: "Remote",
    type: "Full-time"
  },
  {
    id: 2,
    company: "Hedera Foundation",
    position: "Blockchain Developer",
    salary: "150,000 HBAR",
    status: "Interview Scheduled",
    appliedAt: "2024-01-08",
    location: "San Francisco, CA",
    type: "Full-time"
  },
  {
    id: 3,
    company: "Web3 Startup",
    position: "Smart Contract Engineer",
    salary: "100,000 HBAR",
    status: "Under Review",
    appliedAt: "2024-01-12",
    location: "Remote",
    type: "Contract"
  }
];

export function DashboardContent({ stats, skillTokens, applications = mockActiveApplications }: DashboardContentProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Here's your TalentChain Pro overview
          </p>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <DashboardStats stats={stats} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Skills Section */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Trophy className="w-5 h-5 text-blue-600" />
                      <span>Your Skills</span>
                    </CardTitle>
                    <CardDescription>
                      Manage and showcase your verified skill tokens
                    </CardDescription>
                  </div>
                  <Button size="sm" className="bg-hedera-600 hover:bg-hedera-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Skill
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {skillTokens.length === 0 ? (
                  <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                    <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No skill tokens yet</p>
                    <p className="text-sm">Start by adding your first skill token</p>
                    <Button className="mt-4 bg-hedera-600 hover:bg-hedera-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Skill
                    </Button>
                  </div>
                ) : (
                  skillTokens.map((skill, index) => (
                    <SkillCard key={skill.tokenId} skill={skill} index={index} />
                  ))
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <QuickActions />
          </motion.div>

          {/* Applications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="w-5 h-5 text-green-600" />
                  <span>Active Applications</span>
                </CardTitle>
                <CardDescription>
                  Track your job applications and status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {applications.length === 0 ? (
                  <div className="text-center py-6 text-slate-500 dark:text-slate-400">
                    <Briefcase className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No active applications</p>
                  </div>
                ) : (
                  applications.map((application, index) => (
                    <ApplicationCard key={application.id} application={application} index={index} />
                  ))
                )}

                <Button variant="outline" className="w-full mt-4">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Browse Jobs
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <NotificationCenter />
          </motion.div>
        </div>
      </div>

      {/* Activity Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="mt-8"
      >
        <ActivityFeed />
      </motion.div>
    </div>
  );
} 