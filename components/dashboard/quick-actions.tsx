"use client";

import { motion } from "framer-motion";
import { 
  Plus,
  Briefcase,
  Trophy,
  Users,
  FileText,
  Zap,
  ArrowRight,
  Star,
  TrendingUp
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  gradient: string;
  href: string;
  badge?: string;
}

interface QuickActionsProps {
  actions?: QuickAction[];
}

const defaultActions: QuickAction[] = [
  {
    id: 'add-skill',
    title: 'Add Skill',
    description: 'Mint a new skill token',
    icon: Trophy,
    color: 'bg-blue-500',
    gradient: 'from-blue-500 to-blue-600',
    href: '/dashboard/skills/add',
    badge: 'New',
  },
  {
    id: 'browse-jobs',
    title: 'Browse Jobs',
    description: 'Find opportunities',
    icon: Briefcase,
    color: 'bg-green-500',
    gradient: 'from-green-500 to-green-600',
    href: '/dashboard/jobs',
  },
  {
    id: 'quick-apply',
    title: 'Quick Apply',
    description: 'Apply to matched jobs',
    icon: Zap,
    color: 'bg-purple-500',
    gradient: 'from-purple-500 to-purple-600',
    href: '/dashboard/quick-apply',
    badge: 'Hot',
  },
  {
    id: 'network',
    title: 'Network',
    description: 'Connect with companies',
    icon: Users,
    color: 'bg-orange-500',
    gradient: 'from-orange-500 to-orange-600',
    href: '/dashboard/companies',
  },
  {
    id: 'documents',
    title: 'Documents',
    description: 'Manage resume & certs',
    icon: FileText,
    color: 'bg-indigo-500',
    gradient: 'from-indigo-500 to-indigo-600',
    href: '/dashboard/documents',
  },
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'View performance insights',
    icon: TrendingUp,
    color: 'bg-emerald-500',
    gradient: 'from-emerald-500 to-emerald-600',
    href: '/dashboard/analytics',
  },
];

export function QuickActions({ actions = defaultActions }: QuickActionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-yellow-600" />
          <span>Quick Actions</span>
        </CardTitle>
        <CardDescription>
          Access your most common tasks and features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {actions.map((action, index) => {
            const ActionIcon = action.icon;
            
            return (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group"
              >
                <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700 cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                          <ActionIcon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium text-slate-900 dark:text-white text-sm">
                              {action.title}
                            </h3>
                            {action.badge && (
                              <Badge variant="secondary" className="text-xs">
                                {action.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                            {action.description}
                          </p>
                        </div>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    {/* Hover effect overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
        
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-slate-900 dark:text-white text-sm">
                Recent Activity
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                You've completed 3 tasks today
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-slate-900 dark:text-white">
                87
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 