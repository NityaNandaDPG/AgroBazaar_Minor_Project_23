import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  type: "",
  firstname: "",
  lastname:"",
  avatar: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      console.log(action.payload.data);
      state.email=action.payload.data.email;
      state.type=action.payload.data.type;
      state.firstname=action.payload.data.firstname;
      state.lastname=action.payload.data.lastname;
      state.avatar=action.payload.data.avatar;
    },
    logoutRedux: (state)=>{
      state.email="";
      state.type="";
      state.firstname="";
      state.lastname="";
      state.avatar="";
    }
  }
});

export const { loginRedux,logoutRedux } = userSlice.actions;
export default userSlice.reducer;