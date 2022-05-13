import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lang: "ru",
};

export const langSlice = createSlice({
  name: "lang",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setLang: (state, action) => {
      state.user = action.payload.lang;
      localStorage.setItem("lang", action.payload.token);
    },
  },
});

export const { setLang } = langSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export const selectLang = (state) => state.lang.lang;

export default langSlice.reducer;
