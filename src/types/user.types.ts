export enum UserRole {
    ORGANIZER = 'ORGANIZER',
    USER = 'USER'
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}