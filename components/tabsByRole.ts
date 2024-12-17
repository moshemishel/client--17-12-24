import { User, TabsByRole } from '@/types/context/AuthContext';
import pagesByRole from '@/context/pagesByRole';

const getTabsByRole = (user: User | null): TabsByRole=> {
    if (user === null){
        return []
    }
    return pagesByRole(user.role! ,user.userName!)
}

export default getTabsByRole;