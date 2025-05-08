import React, { useState } from 'react';
import { ProfileGroupProvider, useProfileGroups } from '../contexts/ProfileGroupContext';
import { Header } from '../components/Header';
import { GroupCard } from '../components/GroupCard';
import { GroupDialog } from '../components/GroupDialog';
import { DeleteConfirmDialog } from '../components/DeleteConfirmDialog';
import { ProfileGroup } from '../types';
import { PlusCircle, Search, Filter, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const GroupsList = () => {
  const { groups, deleteGroup } = useProfileGroups();
  const [selectedGroup, setSelectedGroup] = useState<ProfileGroup | undefined>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<ProfileGroup | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'createdAt' | 'profiles'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleCreateGroup = () => {
    setSelectedGroup(undefined);
    setDialogOpen(true);
  };

  const handleEditGroup = (group: ProfileGroup) => {
    setSelectedGroup(group);
    setDialogOpen(true);
  };

  const handleDeleteGroup = (group: ProfileGroup) => {
    setGroupToDelete(group);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (groupToDelete) {
      deleteGroup(groupToDelete.id);
      setDeleteDialogOpen(false);
    }
  };

  const filteredGroups = groups
    .filter(group => 
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'createdAt':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'profiles':
          comparison = a.profiles.length - b.profiles.length;
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className="w-64 border-r bg-muted/40">
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <h2 className="text-sm font-semibold">Groups</h2>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search groups..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={(value: 'name' | 'createdAt' | 'profiles') => setSortBy(value)}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="createdAt">Created Date</SelectItem>
                <SelectItem value="profiles">Profile Count</SelectItem>
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
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="p-2 space-y-2">
            {filteredGroups.map((group) => (
              <Button
                key={group.id}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setSelectedGroup(group)}
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium">{group.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {group.profiles.length} profiles
                  </span>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {selectedGroup ? (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold">{selectedGroup.name}</h1>
                <p className="text-muted-foreground">{selectedGroup.description}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleEditGroup(selectedGroup)}>
                  Edit Group
                </Button>
                <Button variant="destructive" onClick={() => handleDeleteGroup(selectedGroup)}>
                  Delete Group
                </Button>
              </div>
            </div>
            <GroupCard
              group={selectedGroup}
              onEdit={handleEditGroup}
              onDelete={handleDeleteGroup}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center space-y-4">
              <div className="bg-muted h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                <PlusCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-medium">Select a Group</h2>
              <p className="text-muted-foreground max-w-md">
                Choose a group from the sidebar or create a new one to get started
              </p>
              <Button onClick={handleCreateGroup}>Create New Group</Button>
            </div>
          </div>
        )}
      </div>

      <GroupDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        group={selectedGroup}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        title="Delete Group"
        description={
          `Are you sure you want to delete "${groupToDelete?.name}"? This action cannot be undone.`
        }
      />
    </div>
  );
};

const Index = () => {
  return (
    <ProfileGroupProvider>
      <Header onCreateGroup={() => {}} />
      <GroupsList />
    </ProfileGroupProvider>
  );
};

export default Index;
