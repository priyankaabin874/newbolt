export interface User {
  username: string;
  email: string;
  id: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface ValidationErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}