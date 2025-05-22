import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RegisterState {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  birthdate: string;
  gender: string;
  requiresLogin?: boolean;
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

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setRegisterData: (state, action: PayloadAction<Partial<RegisterState>>) => {
      return { ...state, ...action.payload };
    },
    resetRegisterData: () => {
      return initialState;
    }
  }
});

export const { setRegisterData, resetRegisterData } = registerSlice.actions;
export default registerSlice.reducer;
