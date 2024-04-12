export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface UserState {
  userInfo: User | null;
  loading: boolean;
  error: string | null;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RootState {
  user: UserState;
  auth: AuthState;
}
