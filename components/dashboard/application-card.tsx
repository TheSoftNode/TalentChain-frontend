"use client";

import { motion } from "framer-motion";
import { 
  Briefcase, 
  Building2, 
  DollarSign, 
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
  MessageSquare,
  ExternalLink
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Application {
  id: number;
  company: string;
  position: string;
  salary: string;
  status: string;
  appliedAt: string;
  location?: string;
  type?: string;
}

interface ApplicationCardProps {
  application: Application;
  index: number;
}

export function ApplicationCard({ application, index }: ApplicationCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'under review':
        return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
      case 'interview scheduled':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'rejected':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
      case 'accepted':
        return 'text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'under review':
        return Clock;
      case 'interview scheduled':
        return CheckCircle;
      case 'rejected':
        return XCircle;
      case 'accepted':
        return CheckCircle;
      default:
        return AlertCircle;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const StatusIcon = getStatusIcon(application.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group"
    >
      <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-hedera-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white text-base mb-1">
                      {application.position}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {application.company}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge className={`font-medium ${getStatusColor(application.status)}`}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {application.status}
                  </Badge>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>View Details</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Contact Recruiter</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        <span>View Job Posting</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600 dark:text-red-400">
                        <XCircle className="mr-2 h-4 w-4" />
                        <span>Withdraw Application</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600 dark:text-slate-400">
                    {application.salary}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600 dark:text-slate-400">
                    Applied {formatDate(application.appliedAt)}
                  </span>
                </div>
                {application.location && (
                  <div className="flex items-center space-x-2">
                    <Briefcase className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600 dark:text-slate-400">
                      {application.location}
                    </span>
                  </div>
                )}
                {application.type && (
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600 dark:text-slate-400">
                      {application.type}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Progress indicator based on status */}
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Application Progress</span>
              <span className="font-medium">
                {application.status === 'Under Review' && '25%'}
                {application.status === 'Interview Scheduled' && '50%'}
                {application.status === 'Accepted' && '100%'}
                {application.status === 'Rejected' && 'Complete'}
              </span>
            </div>
            <div className="mt-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  application.status === 'Under Review' ? 'bg-blue-500 w-1/4' :
                  application.status === 'Interview Scheduled' ? 'bg-green-500 w-1/2' :
                  application.status === 'Accepted' ? 'bg-emerald-500 w-full' :
                  'bg-gray-500 w-full'
                }`}
              />
            </div>
          </div>
        </CardContent>
        
        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-hedera-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </Card>
    </motion.div>
  );
} 