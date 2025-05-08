
import React, { useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { ProfileGroup, SocialProfile } from '../types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProfileGroups } from '../contexts/ProfileGroupContext';
import { SocialIcon } from './SocialIcon';

interface GroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  group?: ProfileGroup;
}

export const GroupDialog: React.FC<GroupDialogProps> = ({ 
  open, 
  onOpenChange, 
  group 
}) => {
  const { addGroup, updateGroup, profiles } = useProfileGroups();
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [selectedProfiles, setSelectedProfiles] = React.useState<string[]>([]);

  useEffect(() => {
    if (group) {
      setName(group.name);
      setDescription(group.description);
      setSelectedProfiles(group.profiles);
    } else {
      setName('');
      setDescription('');
      setSelectedProfiles([]);
    }
  }, [group, open]);

  const handleSave = () => {
    if (name.trim() === '') return;

    if (group) {
      updateGroup({
        ...group,
        name,
        description,
        profiles: selectedProfiles,
      });
    } else {
      addGroup({
        name,
        description,
        profiles: selectedProfiles,
      });
    }
    
    onOpenChange(false);
  };

  const toggleProfile = (profileId: string) => {
    setSelectedProfiles((current) => {
      if (current.includes(profileId)) {
        return current.filter(id => id !== profileId);
      } else {
        return [...current, profileId];
      }
    });
  };

  const isProfileSelected = (profileId: string) => {
    return selectedProfiles.includes(profileId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{group ? 'Edit Group' : 'Create New Group'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Group Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter group name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter group description"
              className="resize-none"
              rows={3}
            />
          </div>
          <div className="grid gap-2">
            <Label>Select Profiles</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {profiles.map((profile) => (
                <Button
                  key={profile.id}
                  type="button"
                  variant={isProfileSelected(profile.id) ? "default" : "outline"}
                  className="justify-start h-auto py-2 px-3"
                  onClick={() => toggleProfile(profile.id)}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <SocialIcon network={profile.network} />
                    <div className="truncate">
                      <p className="text-sm font-medium truncate text-left">
                        {profile.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate text-left">
                        {profile.username}
                      </p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={name.trim() === ''}>
            {group ? 'Save Changes' : 'Create Group'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
