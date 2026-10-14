export type SocialVibe = 'feeling_social' | 'open' | 'low_key';

export type EventCategory = 
  | 'Gaming' 
  | 'Social' 
  | 'Tech' 
  | 'Arts' 
  | 'Career' 
  | 'Wellness' 
  | 'Study';

export interface StudentProfile {
  id: string;
  name: string;
  campus: string;
  major: string;
  year: string;
  commuteFrom: string;
  transitLine: string;
  avatarSeed: string;
  avatarBg: string;
  interests: string[];
  preferredGroupSize: string;
  socialVibe: SocialVibe;
  bio: string;
  scheduleSnippet?: string;
}

export interface CampusEvent {
  id: string;
  title: string;
  organization: string;
  date: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  location: string;
  building: string;
  room: string;
  description: string;
  category: EventCategory;
  tags: string[];
  source: 'UKNIGHTED';
  uknightedUrl: string;
  groupSpotsTotal: number;
  groupSpotsTaken: number;
  interestedStudents: StudentProfile[];
  meetingPoint: string;
  meetingTime: string;
  isLowPressureAlternative?: boolean;
}

export interface GoTogetherGroup {
  id: string;
  eventId: string;
  eventTitle: string;
  meetingPoint: string;
  meetingTime: string;
  members: StudentProfile[];
  maxMembers: number;
  conversationStarter?: string;
  status: 'open' | 'full' | 'joined';
}

export interface CommuterUser {
  name: string;
  campus: string;
  major: string;
  year: string;
  commuteFrom: string;
  transitLine: string;
  nextClassTime: string; // e.g. "12:50 PM"
  nextClassName: string; // e.g. "CS 211 (Remsen Hall)"
  minutesFree: number;
  selectedInterests: string[];
  socialVibe: SocialVibe;
  preferredGroupSize: string;
}
