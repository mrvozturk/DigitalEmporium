import { Session, User } from 'next-auth';


export interface UserProfile {
  id?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  birthDate?: string;
  gender?: string;
  [key: string]: any;
}


export interface CustomUser extends User {
  token?: string;
  user?: UserProfile;
  [key: string]: any;
}

export interface CustomSession extends Session {
  accessToken?: string; 
  user: UserProfile;
  error?: string; 
}


export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: UserProfile;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}


export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}


export interface RegisterCredentials {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  gender: string;
  birthDate: string;
}


export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: UserProfile;
  };
  error?: string;
  errors?: {
    email?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    phoneNumber?: string;
    birthDate?: string;
    gender?: string;
  };
}
