import { BarChart2, Star, Video } from "lucide-react";

export const levelTabActiveClass = {
  Beginner: 'border-b-emerald-400 text-emerald-400 bg-emerald-500/10',
  Intermediate: 'border-b-amber-400 text-amber-400 bg-amber-500/10',
  Novice: 'border-b-orange-400 text-orange-400 bg-orange-500/10',
  Advanced: 'border-b-red-400 text-red-400 bg-red-500/10',
} as const;

export const levelBadgeClass = {
  Beginner: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  Intermediate: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  Novice: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
  Advanced: 'bg-red-500/10 text-red-400 border-red-500/30',
} as const;

export const featureItems = [
  { icon: Star, labelKey: 'expertDesignedWorkout' },
  { icon: BarChart2, labelKey: 'trackYourProgress' },
  { icon: Video, labelKey: 'hdVideoQuality' },
] as const;