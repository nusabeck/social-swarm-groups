export type SocialNetwork = 
  | 'twitter' 
  | 'facebook' 
  | 'instagram' 
  | 'linkedin' 
  | 'youtube' 
  | 'pinterest' 
  | 'tiktok'
  | 'twitch';

export interface SocialProfile {
  id: string;
  name: string;
  username: string;
  network: SocialNetwork;
  avatar: string;
  accessToken: string;
  accessTokenSecret?: string;
}

export interface ProfileGroup {
  id: string;
  name: string;
  description: string;
  profiles: string[];
  createdAt: string;
  updatedAt: string;
}
