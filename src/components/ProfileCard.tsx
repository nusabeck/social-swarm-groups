
import React from 'react';
import { SocialProfile } from '../types';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { SocialIcon } from './SocialIcon';

interface ProfileCardProps {
  profile: SocialProfile;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const initials = profile.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardContent className="p-4 flex items-center space-x-3">
        <Avatar className="h-10 w-10 border">
          <AvatarImage src={profile.avatar} alt={profile.name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium truncate">{profile.name}</p>
            <SocialIcon network={profile.network} size={14} />
          </div>
          <p className="text-xs text-muted-foreground truncate">{profile.username}</p>
        </div>
      </CardContent>
    </Card>
  );
};
