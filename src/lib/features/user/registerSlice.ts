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

const initialState: RegisterState = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  phoneNumber: '',
  birthdate: '',
  gender: ''
};

const getInitialState = () => {
  if (typeof window !== 'undefined') {
    const savedData = localStorage.getItem('userData');
    return savedData ? JSON.parse(savedData) : initialState;
  }
  return initialState;
};

const initialStateFromStorage = getInitialState();

export const registerSlice = createSlice({
  name: 'register',
  initialState: initialStateFromStorage,
  reducers: {
    setRegisterData: (state, action: PayloadAction<Partial<RegisterState>>) => {
      const updatedState = { ...state, ...action.payload };
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

export const { setRegisterData, resetRegisterData } = registerSlice.actions;
export default registerSlice.reducer;
