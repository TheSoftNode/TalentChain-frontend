"use client";

import { motion } from "framer-motion";
import { 
  Trophy, 
  Clock, 
  CheckCircle, 
  Star,
  
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { DashboardStats } from "@/lib/types/wallet";

interface DashboardStatsProps {
  stats: DashboardStats;
}

const statCards = [
  {
    key: 'totalSkillTokens',
    title: 'Skill Tokens',
    icon: Trophy,
    color: 'blue',
    gradient: 'from-blue-400 to-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    key: 'activeApplications',
    title: 'Active Applications',
    icon: Clock,
    color: 'orange',
    gradient: 'from-orange-400 to-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    iconColor: 'text-orange-600 dark:text-orange-400',
  },
  {
    key: 'completedMatches',
    title: 'Completed Matches',
    icon: CheckCircle,
    color: 'green',
    gradient: 'from-green-400 to-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    iconColor: 'text-green-600 dark:text-green-400',
  },
  {
    key: 'reputationScore',
    title: 'Reputation Score',
    icon: Star,
    color: 'purple',
    gradient: 'from-purple-400 to-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
];

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((card, index) => {
        const Icon = card.icon;
        const value = stats[card.key as keyof DashboardStats];
        
        return (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                      {card.title}
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {card.key === 'reputationScore' ? `${value}/100` : value}
                    </p>
                    {card.key === 'reputationScore' && (
                      <Progress 
                        value={value as number} 
                        className="mt-2 h-2" 
                      />
                    )}
                  </div>
                  <div className={`p-3 ${card.bgColor} rounded-full group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${card.iconColor}`} />
                  </div>
                </div>
                <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${card.gradient}`} />
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
} 