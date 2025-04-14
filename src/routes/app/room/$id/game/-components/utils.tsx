import type { DataModel } from "@convex/_generated/dataModel";
import type { Ability } from "./types";
import { AlertCircle, Clock3, Eye, FastForward, Shield, Target, Timer, Lock } from "lucide-react";

// Format time for display
export const formatTime = (ms: number): string => {
  const minutes = Math.floor(ms / 60000).toString().padStart(2, '0');
  const seconds = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
  const milliseconds = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
  return `${minutes}:${seconds}.${milliseconds}`;
};

export const roleAbilities: Record<
  DataModel['rooms']['document']['members'][0]['role'],
  Ability[]
> = {
  Leader: [
    {
      icon: <Timer />,
      name: 'Start/Stop',
      description: 'Control the game timer',
    },
    {
      icon: <FastForward />,
      name: 'Speed Boost',
      description: 'Increase timer speed by 20%',
    },
  ],
  Lookout: [
    {
      icon: <Eye />,
      name: 'Future Sight',
      description: 'See one additional time window',
    },
    {
      icon: <AlertCircle />,
      name: 'Alert Team',
      description: 'Notify team of upcoming window',
    },
  ],
  Technician: [
    {
      icon: <Clock3 />,
      name: 'Slow Time',
      description: 'Slow timer by 30% for 5 seconds',
    },
    {
      icon: <Shield />,
      name: 'Firewall',
      description: 'Protect from one missed window',
    },
  ],
  Safecracker: [
    {
      icon: <Target />,
      name: 'Precision',
      description: 'Double points for perfect hits',
    },
    {
      icon: <Lock />,
      name: 'Crack',
      description: 'Automatically hit one window',
    },
  ],
}