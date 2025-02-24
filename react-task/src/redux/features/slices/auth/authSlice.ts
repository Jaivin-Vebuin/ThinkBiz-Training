import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { authReduxInitStateType } from "../../../../data/model/types/reduxInitialStateTypes";
import { sliceNames } from "../../../../utils/constants/app.constants";

type AuthTokenPayload = {
  message: string;
  token: string;
};

const initialState: authReduxInitStateType = {
  message: "",
  token: "",
};

const authTokenSlice = createSlice({
  name: sliceNames.authSlice,
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<AuthTokenPayload>) => {
      state.message = action.payload.message;
      state.token = action.payload.token;
    },
  },
});

export default authTokenSlice.reducer;
export const { setAuthToken } = authTokenSlice.actions;
