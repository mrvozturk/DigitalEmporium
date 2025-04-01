import { Session, User } from 'next-auth';

/**
 * Kullanıcı Profil Bilgileri
 * Kullanıcının temel profil bilgilerini içeren tip
 */
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

/**
 * NextAuth User tipini genişleten özel kullanıcı tipi
 * API yanıtından gelen token ve user bilgilerini içerir
 */
export interface CustomUser extends User {
  token?: string;
  user?: UserProfile;
  [key: string]: any;
}

/**
 * NextAuth Session tipini genişleten özel oturum tipi
 * Token ve kullanıcı bilgilerini içerir
 */
export interface CustomSession extends Session {
  accessToken?: string; // JWT token'ı tutmak için
  user: UserProfile;
  error?: string; // Oturum hatalarını izlemek için
}

/**
 * Giriş Yanıtı - API'den dönen yanıt formatı
 */
export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: UserProfile;
  };
}

/**
 * Giriş Bilgileri
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * API Yanıt Formatı
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

/**
 * Kayıt Bilgileri
 */
export interface RegisterCredentials {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  gender: string;
  birthDate: string;
}

/**
 * Kayıt Yanıtı
 */
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
