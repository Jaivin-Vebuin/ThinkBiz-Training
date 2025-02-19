import { createSlice } from "@reduxjs/toolkit";
import { languageReduxInitStateType } from "../../../data/model/types/languageReduxInitStateType";
import { languages, sliceNames } from "../../../utils/constants/app.constants";

const initialState: languageReduxInitStateType= {
  language: languages[0].value,
};

const languageSlice = createSlice({
  name: sliceNames.languageSlice,
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export default languageSlice.reducer;
export const { setLanguage } = languageSlice.actions;
