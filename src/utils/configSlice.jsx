import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice ({
    name: "config",
    initialState: {
        LANGUAGES: "en",
},
  reducers: {
    changeLanguage: (state, action) => {
        state.LANGUAGES = action.payload;
    },
},
});

export const { changeLanguage } = configSlice.actions;
export default configSlice.reducer;