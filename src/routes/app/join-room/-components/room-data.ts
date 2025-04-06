export interface Room {
  id: string
  name: string
  members: number
  capacity: number
  isPrivate: boolean
  activity: 'high' | 'medium' | 'low'
  lastActive: string
}

// Mock room data
export const mockRooms: Room[] = [
  { 
    id: 'room123', 
    name: 'Secret Meeting', 
    members: 2, 
    capacity: 4,
    isPrivate: true,
    activity: 'high',
    lastActive: '2 min ago'
  },
  { 
    id: 'room456', 
    name: 'Game Night', 
    members: 4, 
    capacity: 5,
    isPrivate: false,
    activity: 'medium',
    lastActive: 'Just now'
  },
  { 
    id: 'room789', 
    name: 'Study Group', 
    members: 1, 
    capacity: 3,
    isPrivate: false,
    activity: 'low',
    lastActive: '10 min ago'
  },
  { 
    id: 'roomabc', 
    name: 'Creative Collab', 
    members: 3, 
    capacity: 4,
    isPrivate: true,
    activity: 'medium',
    lastActive: '5 min ago'
  },
] 