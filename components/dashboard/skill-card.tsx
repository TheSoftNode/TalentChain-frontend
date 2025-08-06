"use client";

import { motion } from "framer-motion";
import { 
  Trophy, 
  ArrowUpRight, 
  Star,
  Eye,
  Edit,
  Trash2,
  ExternalLink
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SkillTokenInfo } from "@/lib/types/wallet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SkillCardProps {
  skill: SkillTokenInfo;
  index: number;
}

export function SkillCard({ skill, index }: SkillCardProps) {
  const getSkillLevelColor = (level: number) => {
    if (level >= 8) return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30";
    if (level >= 6) return "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30";
    if (level >= 4) return "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30";
    return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30";
  };

  const getSkillLevelText = (level: number) => {
    if (level >= 8) return "Expert";
    if (level >= 6) return "Advanced";
    if (level >= 4) return "Intermediate";
    return "Beginner";
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group"
    >
      <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-hedera-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 dark:text-white text-lg mb-1">
                  {skill.category}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Token ID: {skill.tokenId}
                </p>
                <div className="flex items-center space-x-2">
                  <Badge className={`font-medium ${getSkillLevelColor(skill.level)}`}>
                    {getSkillLevelText(skill.level)}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Level {skill.level}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Edit className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    <span>View Details</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit Skill</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    <span>View on Explorer</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600 dark:text-red-400">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Remove</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Skill progress indicator */}
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">Skill Level</span>
              <span className="font-medium text-slate-900 dark:text-white">
                {skill.level}/10
              </span>
            </div>
            <div className="mt-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-hedera-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(skill.level / 10) * 100}%` }}
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