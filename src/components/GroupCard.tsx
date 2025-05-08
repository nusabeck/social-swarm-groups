import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ProfileGroup } from '../types';
import { Edit, Trash2, Search, Filter, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { useProfileGroups } from '../contexts/ProfileGroupContext';
import { ProfileCard } from './ProfileCard';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface GroupCardProps {
  group: ProfileGroup;
  onEdit: (group: ProfileGroup) => void;
  onDelete: (group: ProfileGroup) => void;
}

export const GroupCard: React.FC<GroupCardProps> = ({ group, onEdit, onDelete }) => {
  const { getProfilesForGroup } = useProfileGroups();
  const profiles = getProfilesForGroup(group.id);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'network'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredProfiles = profiles
    .filter(profile => 
      profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.username.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'network':
          comparison = a.network.localeCompare(b.network);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

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
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search profiles..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={sortBy} onValueChange={(value: 'name' | 'network') => setSortBy(value)}>
              <SelectTrigger className="h-9 w-[130px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="network">Network</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSortOrder(order => order === 'asc' ? 'desc' : 'asc')}
            >
              <ChevronDown className={cn("h-4 w-4 transition-transform", sortOrder === 'desc' && "rotate-180")} />
            </Button>
          </div>
          
          {filteredProfiles.length > 0 ? (
            <ScrollArea className="h-[calc(100vh-24rem)]">
              <div className="space-y-2 pr-4">
                {filteredProfiles.map((profile) => (
                  <ProfileCard key={profile.id} profile={profile} />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="h-[calc(100vh-24rem)] flex items-center justify-center">
              <p className="text-sm text-muted-foreground">
                {searchQuery ? 'No profiles match your search' : 'No profiles in this group'}
              </p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2 pb-3 text-xs text-muted-foreground flex justify-between">
        <span>Created: {format(new Date(group.createdAt), 'MMM d, yyyy')}</span>
        <Badge variant="outline" className="text-xs">
          {filteredProfiles.length} of {profiles.length} {profiles.length === 1 ? 'profile' : 'profiles'}
        </Badge>
      </CardFooter>
    </Card>
  );
};
