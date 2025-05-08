
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ProfileGroup } from '../types';
import { Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useProfileGroups } from '../contexts/ProfileGroupContext';
import { ProfileCard } from './ProfileCard';
import { Badge } from './ui/badge';

interface GroupCardProps {
  group: ProfileGroup;
  onEdit: (group: ProfileGroup) => void;
  onDelete: (group: ProfileGroup) => void;
}

export const GroupCard: React.FC<GroupCardProps> = ({ group, onEdit, onDelete }) => {
  const { getProfilesForGroup } = useProfileGroups();
  const profiles = getProfilesForGroup(group.id);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{group.name}</CardTitle>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(group)}
              className="h-8 w-8"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(group)}
              className="h-8 w-8 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{group.description}</p>
      </CardHeader>
      <CardContent className="flex-1">
        {profiles.length > 0 ? (
          <div className="space-y-2">
            {profiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-sm text-muted-foreground">No profiles in this group</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2 pb-3 text-xs text-muted-foreground flex justify-between">
        <span>Created: {format(new Date(group.createdAt), 'MMM d, yyyy')}</span>
        <Badge variant="outline" className="text-xs">
          {profiles.length} {profiles.length === 1 ? 'profile' : 'profiles'}
        </Badge>
      </CardFooter>
    </Card>
  );
};
