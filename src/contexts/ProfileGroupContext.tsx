
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockGroups, mockProfiles } from '../data/mockData';
import { ProfileGroup, SocialProfile } from '../types';
import { toast } from '../components/ui/sonner';

interface ProfileGroupContextType {
  groups: ProfileGroup[];
  profiles: SocialProfile[];
  addGroup: (group: Omit<ProfileGroup, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateGroup: (group: ProfileGroup) => void;
  deleteGroup: (groupId: string) => void;
  getProfilesForGroup: (groupId: string) => SocialProfile[];
}

const ProfileGroupContext = createContext<ProfileGroupContextType | undefined>(undefined);

export const useProfileGroups = () => {
  const context = useContext(ProfileGroupContext);
  if (context === undefined) {
    throw new Error('useProfileGroups must be used within a ProfileGroupProvider');
  }
  return context;
};

export const ProfileGroupProvider = ({ children }: { children: ReactNode }) => {
  const [groups, setGroups] = useState<ProfileGroup[]>(mockGroups);
  const [profiles] = useState<SocialProfile[]>(mockProfiles);

  const addGroup = (newGroupData: Omit<ProfileGroup, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newGroup: ProfileGroup = {
      ...newGroupData,
      id: `g${groups.length + 1}`,
      createdAt: now,
      updatedAt: now,
    };

    setGroups([...groups, newGroup]);
    toast.success(`Group "${newGroup.name}" created successfully`);
  };

  const updateGroup = (updatedGroup: ProfileGroup) => {
    setGroups(
      groups.map((group) =>
        group.id === updatedGroup.id
          ? { ...updatedGroup, updatedAt: new Date().toISOString() }
          : group
      )
    );
    toast.success(`Group "${updatedGroup.name}" updated successfully`);
  };

  const deleteGroup = (groupId: string) => {
    const groupName = groups.find(g => g.id === groupId)?.name;
    setGroups(groups.filter((group) => group.id !== groupId));
    toast.success(`Group "${groupName}" deleted successfully`);
  };

  const getProfilesForGroup = (groupId: string): SocialProfile[] => {
    const group = groups.find((g) => g.id === groupId);
    if (!group) return [];
    
    return profiles.filter((profile) => group.profiles.includes(profile.id));
  };

  return (
    <ProfileGroupContext.Provider
      value={{
        groups,
        profiles,
        addGroup,
        updateGroup,
        deleteGroup,
        getProfilesForGroup,
      }}
    >
      {children}
    </ProfileGroupContext.Provider>
  );
};
