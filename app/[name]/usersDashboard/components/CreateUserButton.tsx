'use client'
import { useState } from 'react';
import { Button } from '@mui/material';
import CreateUserDialog from './CreateUserDialog';

const UsersDashboard = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);


  return (
    <>
      <Button variant="contained" onClick={handleOpenDialog}>
        Create New User
      </Button>
      <CreateUserDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
      />
    </>
  );
};

export default UsersDashboard;