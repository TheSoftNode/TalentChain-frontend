"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp,
  Users,
  Trophy,
  Briefcase,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Minus,
  ExternalLink,
  Calendar
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Activity {
  id: string;
  type: 'skill_added' | 'application_submitted' | 'transaction' | 'reward' | 'match';
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
  amount?: string;
  icon: any;
}

interface ActivityFeedProps {
  activities?: Activity[];
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'skill_added',
    title: 'React Development Skill Added',
    description: 'Successfully minted skill token for React Development',
    timestamp: '2024-01-15T10:30:00Z',
    status: 'completed',
    icon: Trophy,
  },
  {
    id: '2',
    type: 'application_submitted',
    title: 'Application Submitted',
    description: 'Applied for Senior Frontend Developer at DeFi Protocol',
    timestamp: '2024-01-14T15:45:00Z',
    status: 'completed',
    icon: Briefcase,
  },
  {
    id: '3',
    type: 'transaction',
    title: 'HBAR Transaction',
    description: 'Received 50 HBAR for skill verification',
    timestamp: '2024-01-14T12:20:00Z',
    status: 'completed',
    amount: '+50 HBAR',
    icon: TrendingUp,
  },
  {
    id: '4',
    type: 'match',
    title: 'Job Match Found',
    description: 'Matched with Blockchain Developer position',
    timestamp: '2024-01-13T09:15:00Z',
    status: 'pending',
    icon: Users,
  },
  {
    id: '5',
    type: 'reward',
    title: 'Reputation Points Earned',
    description: 'Earned 25 reputation points for profile completion',
    timestamp: '2024-01-12T16:30:00Z',
    status: 'completed',
    amount: '+25 pts',
    icon: CheckCircle,
  },
];

export function ActivityFeed({ activities = mockActivities }: ActivityFeedProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
      case 'failed':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle;
      case 'pending':
        return Clock;
      case 'failed':
        return AlertCircle;
      default:
        return Clock;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          <span>Recent Activity</span>
        </CardTitle>
        <CardDescription>
          Your latest blockchain transactions and activities
        </CardDescription>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No recent transactions</p>
            <p className="text-sm">Start by creating a skill token or applying to jobs</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity, index) => {
              const ActivityIcon = activity.icon;
              const StatusIcon = getStatusIcon(activity.status);
              
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline connector */}
                  {index < activities.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-8 bg-slate-200 dark:bg-slate-700" />
                  )}
                  
                  <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-hedera-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                        <ActivityIcon className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${getStatusColor(activity.status)}`}>
                          <StatusIcon className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-slate-900 dark:text-white text-sm">
                            {activity.title}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            {activity.description}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          {activity.amount && (
                            <Badge variant="outline" className="text-xs font-medium">
                              {activity.amount}
                            </Badge>
                          )}
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-2">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {formatTimestamp(activity.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
        
        {activities.length > 0 && (
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
            <Button variant="outline" className="w-full">
              <TrendingUp className="w-4 h-4 mr-2" />
              View All Activity
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 