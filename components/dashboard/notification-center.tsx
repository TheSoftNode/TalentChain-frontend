"use client";

import { motion } from "framer-motion";
import { 
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  X,
  Clock,
  Star,
  MessageSquare
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  action?: string;
}

interface NotificationCenterProps {
  notifications?: Notification[];
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Skill Token Minted',
    message: 'Your React Development skill token has been successfully minted on Hedera.',
    timestamp: '2024-01-15T10:30:00Z',
    read: false,
    action: 'View Token',
  },
  {
    id: '2',
    type: 'info',
    title: 'New Job Match',
    message: 'You have been matched with 3 new job opportunities based on your skills.',
    timestamp: '2024-01-15T09:15:00Z',
    read: false,
    action: 'View Matches',
  },
  {
    id: '3',
    type: 'warning',
    title: 'Profile Incomplete',
    message: 'Complete your profile to increase your chances of getting hired.',
    timestamp: '2024-01-14T16:45:00Z',
    read: true,
    action: 'Complete Profile',
  },
  {
    id: '4',
    type: 'success',
    title: 'Application Submitted',
    message: 'Your application for Senior Frontend Developer has been submitted successfully.',
    timestamp: '2024-01-14T14:20:00Z',
    read: true,
  },
  {
    id: '5',
    type: 'info',
    title: 'Reputation Points Earned',
    message: 'You earned 25 reputation points for completing your profile.',
    timestamp: '2024-01-13T11:30:00Z',
    read: true,
  },
];

export function NotificationCenter({ notifications = mockNotifications }: NotificationCenterProps) {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return CheckCircle;
      case 'warning':
        return AlertCircle;
      case 'error':
        return AlertCircle;
      case 'info':
        return Info;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
      case 'error':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
      case 'info':
        return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
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

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-slate-600" />
            <span>Notifications</span>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <X className="w-4 h-4" />
          </Button>
        </div>
        <CardDescription>
          Stay updated with your latest activities and opportunities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {notifications.slice(0, 5).map((notification, index) => {
            const NotificationIcon = getNotificationIcon(notification.type);
            
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`relative p-4 rounded-lg border transition-all duration-200 ${
                  notification.read 
                    ? 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700' 
                    : 'bg-white dark:bg-slate-900 border-hedera-200 dark:border-hedera-700 shadow-sm'
                }`}
              >
                {!notification.read && (
                  <div className="absolute top-4 right-4 w-2 h-2 bg-hedera-500 rounded-full" />
                )}
                
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getNotificationColor(notification.type)}`}>
                    <NotificationIcon className="w-4 h-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className={`font-medium text-sm ${
                          notification.read 
                            ? 'text-slate-700 dark:text-slate-300' 
                            : 'text-slate-900 dark:text-white'
                        }`}>
                          {notification.title}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {formatTimestamp(notification.timestamp)}
                        </span>
                      </div>
                      
                      {notification.action && (
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                          {notification.action}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {notifications.length > 5 && (
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <Button variant="outline" className="w-full">
              <MessageSquare className="w-4 h-4 mr-2" />
              View All Notifications
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 