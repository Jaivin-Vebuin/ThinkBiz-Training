import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { languageReduxInitStateType } from "../../../../data/model/types/reduxInitialStateTypes";
import { sliceNames } from "../../../../utils/constants/app.constants";

const initialState: languageReduxInitStateType= {
    language: "en",
};

const languageSlice = createSlice({
  name: sliceNames.languageSlice,
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export default languageSlice.reducer;
export const { setLanguage } = languageSlice.actions;
