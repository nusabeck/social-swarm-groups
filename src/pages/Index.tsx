
import React, { useState } from 'react';
import { ProfileGroupProvider, useProfileGroups } from '../contexts/ProfileGroupContext';
import { Header } from '../components/Header';
import { GroupCard } from '../components/GroupCard';
import { GroupDialog } from '../components/GroupDialog';
import { DeleteConfirmDialog } from '../components/DeleteConfirmDialog';
import { ProfileGroup } from '../types';
import { PlusCircle } from 'lucide-react';
import { Button } from '../components/ui/button';

const GroupsGrid = () => {
  const { groups, deleteGroup } = useProfileGroups();
  const [selectedGroup, setSelectedGroup] = useState<ProfileGroup | undefined>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<ProfileGroup | null>(null);

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

  return (
    <>
      <Header onCreateGroup={handleCreateGroup} />
      <main className="container py-8">
        {groups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                onEdit={handleEditGroup}
                onDelete={handleDeleteGroup}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-center space-y-4">
              <div className="bg-muted h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                <PlusCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-medium">No groups yet</h2>
              <p className="text-muted-foreground max-w-md">
                Create your first profile group to organize your social media profiles
                and manage them more efficiently.
              </p>
              <Button onClick={handleCreateGroup}>Create Your First Group</Button>
            </div>
          </div>
        )}
      </main>

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
    </>
  );
};

const Index = () => {
  return (
    <ProfileGroupProvider>
      <GroupsGrid />
    </ProfileGroupProvider>
  );
};

export default Index;
