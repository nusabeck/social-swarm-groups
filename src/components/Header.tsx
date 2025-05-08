
import React from 'react';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

interface HeaderProps {
  onCreateGroup: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCreateGroup }) => {
  return (
    <header className="border-b">
      <div className="container py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Social Swarm</h1>
          <p className="text-sm text-muted-foreground">
            Manage your social media profile groups
          </p>
        </div>
        <Button onClick={onCreateGroup}>
          <Plus className="h-4 w-4 mr-2" />
          Create Group
        </Button>
      </div>
    </header>
  );
};
