import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
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
      state.isAuthenticated = true;
      state.email=action.payload.data.email;
      state.type=action.payload.data.type;
      state.firstname=action.payload.data.firstname;
      state.lastname=action.payload.data.lastname;
      state.avatar=action.payload.data.avatar;
    },
    logoutRedux: (state)=>{
      state.isAuthenticated = false;
    }
  }
});

export const { loginRedux,logoutRedux } = userSlice.actions;
export default userSlice.reducer;

// import  {createSlice} from '@reduxjs/toolkit';

// const initialState = {

//     state: {
//         isFetching: false,
//     },
//     user:{
//   name:"collins",
//   isAuthenticated:true
// },
// }

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setIsFetching : (state) => {
//         state.state.isFetching = true;
//   }, 
//   }  
// });

// export const {
//       setIsFetching,
//     } = userSlice.actions;


// export default userSlice.reducer;