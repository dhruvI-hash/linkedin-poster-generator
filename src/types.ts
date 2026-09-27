export interface EventConfig {
  eventName: string;
  companyName: string;
  location: string;
  dates: string;
  currentSession: string;
  stageName: string;
  hashtags: string[];
  linkedinHandle: string;
  twitterHandle: string;
  websiteUrl: string;
  portalUrl: string;
  activePresets: {
    keynote: boolean;
    speakerQuote: boolean;
    networking: boolean;
    productLaunch: boolean;
  };
}

export type ToneType = 'executive' | 'grateful' | 'takeaways' | 'visionary' | 'technical';

export interface PostImage {
  id: string;
  url: string;
  name: string;
  size: string;
  tag: string;
  isPrimary?: boolean;
}

export interface UserProfile {
  name: string;
  headline: string;
  avatar: string;
  connectionDegree: string;
}

export interface ActivityItem {
  id: string;
  authorName: string;
  avatar: string;
  timeAgo: string;
  snippet: string;
  mediaNote?: string;
  presetTemplate?: string;
  tone?: string;
  platform: 'LinkedIn' | 'Twitter';
}
