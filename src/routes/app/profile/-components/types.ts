import type { ReactNode } from 'react'

export type Achievement = {
  name: string;
  description: string;
  unlocked: boolean;
  icon: ReactNode;
}

export type Ability = {
  name: string;
  description: string;
  cost: number;
  unlocked: boolean;
  icon: ReactNode;
}

export type Role = {
  name: string;
  played: number;
  accuracy: number;
}

export type RecentGame = {
  date: string;
  role: string;
  points: number;
  result: 'Win' | 'Loss';
}

export type UserData = {
  username: string;
  avatar: string;
  points: number;
  gamesPlayed: number;
  accuracy: number;
  favoriteRole: string;
  wins: number;
  level: number;
  stats: {
    roles: Role[];
    recentGames: RecentGame[];
  };
  abilities: Ability[];
  achievements: Achievement[];
} 