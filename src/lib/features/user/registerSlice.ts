import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RegisterState {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  birthdate: string;
  gender: string;
}

// Başlangıç durumu
const initialState: RegisterState = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  phoneNumber: '',
  birthdate: '',
  gender: ''
};

// Client-side için localStorage kontrolü
const getInitialState = (): RegisterState => {
  if (typeof window !== 'undefined') {
    const savedData = localStorage.getItem('userData');
    return savedData ? JSON.parse(savedData) : initialState;
  }
  return initialState;
};

export const registerSlice = createSlice({
  name: 'register',
  initialState: getInitialState(),
  reducers: {
    setRegisterData: (state, action: PayloadAction<Partial<RegisterState>>) => {
      const updatedState = { ...state, ...action.payload };
      // localStorage'a kaydet (client-side'da)
      if (typeof window !== 'undefined') {
        localStorage.setItem('userData', JSON.stringify(updatedState));
      }
      return updatedState;
    },
    resetRegisterData: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('userData');
      }
      return initialState;
    }
  }
});

// Aksiyonları dışa aktar
export const { setRegisterData, resetRegisterData } = registerSlice.actions;
export default registerSlice.reducer;
