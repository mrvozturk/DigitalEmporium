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

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setRegisterData: (state, action: PayloadAction<Partial<RegisterState>>) => {
      return { ...state, ...action.payload };
    },
    resetRegisterData: () => initialState
  }
});

export const { setRegisterData, resetRegisterData } = registerSlice.actions;
export default registerSlice.reducer;
