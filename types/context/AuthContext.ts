export interface User {
    userName: string | null;
    role: number | null;
    userId : string | null;
    login : boolean;
    msg : string;
};

export interface AuthContextType{
    user: User| null;
    login: (user: User) => void;
    logout: () => void;
};

export type PagesByRole = {
    name: string;
    link: string;
}[];

export type TabsByRole = PagesByRole