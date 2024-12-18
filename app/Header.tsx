'use client';
import { AppBar, Toolbar, Typography} from "@mui/material";
import { useAuth } from '@/context/AuthContext';
import UserAvatar from './UserAvatar';
import UserTabs from "./UserTabs";
import AuthButtons from "./AuthButtons";


const mainNavBer = () => {
    const {user} = useAuth();

    return (
        <>
        <AppBar position="fixed" sx={{background: '#063970'}}>
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>Logo payment</Typography>
                {!!user ?
                    <>
                        <UserTabs />
                        <UserAvatar />
                    </>
                    :
                    <>
                    <AuthButtons />
                    </>   
                }
            </Toolbar>
        </AppBar>
        </>
    )
};

export default mainNavBer;