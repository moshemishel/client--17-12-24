import { Tab, Tabs } from "@mui/material";
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import getTabsByRole from '@/components/tabsByRole';
import {PagesByRole} from '@/types/context/AuthContext';


const userTabs = () =>{
    const { user } = useAuth();
    const router = useRouter();
    const pages: PagesByRole = getTabsByRole(user);


    const pathname = usePathname();
    const currentTab = pathname.split('/').pop();
    const [currentTabIndex, setCurrentTabIndex] = useState<number>(-1);
    
    useEffect(() => {
        if (currentTab) {
            const currentTabIndex = pages.findIndex(page => page.link.includes(currentTab));
            setCurrentTabIndex(currentTabIndex);            
        }
    }, [pathname, pages]);
   

    return (
        <Tabs 
            textColor="inherit"
            indicatorColor="secondary" 
            value={currentTabIndex !== -1 ? currentTabIndex : false} 
            onChange={(e, val) => router.push(pages[val].link)}
        >
            {pages.map((page, index) => (
                <Tab key={index} label={page.name} />
            ))}
        </Tabs>
    )
};

export default userTabs;