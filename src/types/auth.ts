export interface User {
    id: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    imageUrl?: string;
    username?: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    returnTo: string | null;
} 