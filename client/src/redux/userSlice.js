import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  Type: "",
  image: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      console.log(action.payload.data); // Correctly accessing action.payload.data
      state.name = action.payload.data.name; // Accessing properties via action.payload.data
      state.email = action.payload.data.email;
      state.Type = action.payload.data.Type;
      state.image = action.payload.data.image;
    },
  },
});

export const { loginRedux } = userSlice.actions;

export default userSlice.reducer;
