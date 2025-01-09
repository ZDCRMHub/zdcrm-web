'use client';
import { Reducer, useLayoutEffect } from 'react';
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode
} from 'react';
import { APIAxios, setAxiosDefaultToken } from "@/utils/axios";
import { authTokenStorage } from '@/utils/auth';
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { LoginAPIResponse } from '@/app/(auth)/misc/api/postLogin';
import { useRouter } from 'next/navigation';

// Existing interfaces
export interface UserData {
  id: number;
  email: string;
  name: string;
  phone: string;
  image: string | null;
  role: number;
  role_name: string;
  permissions: string[];
  is_active: boolean;
  create_date: string;
}



export interface AuthState {
  user: UserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAuthenticating: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isAuthenticating: true,
  error: null,
};

// Action Types and Reducer remain the same as in your previous implementation

export type AuthActionType =
  | { type: 'SET_AUTHENTICATING'; payload: boolean }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGIN_SUCCESS'; payload: UserData }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'SET_ERROR'; payload: string | null };

export const authReducer: Reducer<AuthState, AuthActionType> = (state, action) => {
  switch (action.type) {
    case 'SET_AUTHENTICATING':
      return {
        ...state,
        isAuthenticating: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        isAuthenticating: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isAuthenticating: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Sign In Function for React Query
type SignInData = {
  email: string;
  password: string;
}

const signIn = async (data: SignInData): Promise<LoginAPIResponse> => {
  const response = await APIAxios.post<LoginAPIResponse>('/auth/login/', data);
  console.log(response.data);
  return response.data;
}

// Context type
interface AuthContextType extends AuthState {
  dispatch: React.Dispatch<AuthActionType>;
  useSignIn: () => UseMutationResult<LoginAPIResponse, Error, SignInData, unknown>
  logout: () => void;
  checkAuthStatus: () => Promise<void>;
}

// Create Context
const AuthContext = createContext<AuthContextType>({
  ...initialAuthState,
  dispatch: () => { },
  useSignIn: () => ({} as ReturnType<typeof useMutation<LoginAPIResponse, Error, SignInData>>),
  logout: () => { },
  checkAuthStatus: async () => { },
});

// Provider Component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const router = useRouter();

  // React Query Mutation Hook
  const useSignIn = () => {
    return useMutation<LoginAPIResponse, Error, SignInData>({
      mutationFn: signIn,
      mutationKey: ['signIn'],
      onSuccess: (data) => {
        // Store token
        authTokenStorage.setToken(data.data?.access_token);
        setAxiosDefaultToken(data.data?.access_token)

        // Dispatch login success
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: data.data
        });
      },
      onError: (error: Error) => {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: error.message || 'Login failed'
        });
        authTokenStorage.clearToken();
      }
    });
  };

  // Logout function
  const logout = () => {
    authTokenStorage.clearToken();
    dispatch({ type: 'LOGOUT' });
  };

  const checkAuthStatus = async () => {
    const token = authTokenStorage.getToken();

    if (!token) {
      router.push('/login');
      dispatch({ type: 'SET_AUTHENTICATING', payload: false });
      return;
    }
    setAxiosDefaultToken(token)
    // Decode token and check expiry
    const decodedToken: { exp: number } = JSON.parse(atob(token.split('.')[1]));
    const isTokenExpired = decodedToken.exp * 1000 < Date.now();

    if (isTokenExpired) {
      authTokenStorage.clearToken();
      dispatch({ type: 'SET_AUTHENTICATING', payload: false });
      return;
    }
    try {    
      setAxiosDefaultToken(token)
      const response = await APIAxios.get('/auth/get-user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data?.data as UserData
      });
    } catch (error) {
      
      authTokenStorage.clearToken();
      dispatch({ type: 'SET_AUTHENTICATING', payload: false });
    }
  };

  // Check auth status on mount
  useLayoutEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
        useSignIn,
        logout,
        checkAuthStatus
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};