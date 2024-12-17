'use client';
import { Avatar, Box, Button } from "@mui/material";
import { useState } from "react";
import { useAuth } from '@/context/AuthContext';



const generateAvatar = (name: string) => {
    if (!name) return 'U';
    const initials = name
      .split(' ')
      .map(word => word[0]?.toUpperCase())
      .join('');
      
    return initials || 'U';
  };

const userAvatar = () => {
    const {user , logout} = useAuth();

    const [isAvatarHovered, setIsAvatarHovered] = useState(false);


    return (
        <Box
            sx={{
                position: 'relative',
                display: 'inline-block',
            }}
            onMouseEnter={() => setIsAvatarHovered(true)}
            onMouseLeave={() => setIsAvatarHovered(false)}
        >
            <Avatar
                sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    width: 40,
                    height: 40,
                    cursor: 'pointer'
                }}
                alt={user?.userName || 'User'}
            >
                {generateAvatar(user?.userName!)}
            </Avatar>
            {isAvatarHovered && (
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={logout}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        marginTop: '10px',
                    }}
                >
                    Log out
                </Button>
            )}
        </Box>
    )
};
export default  userAvatar;