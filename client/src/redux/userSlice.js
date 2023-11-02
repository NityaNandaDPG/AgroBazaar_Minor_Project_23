import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id:"",
  isAuthenticated:false,
  email: "",
  type: "",
  firstname: "",
  lastname:"",
  avatar: "",
  cart:[
    {
      product: null,
      quantity: 1,
    }
  ]
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      console.log(action.payload.data);
      state._id=action.payload.data._id;
      state.email=action.payload.data.email;
      state.type=action.payload.data.type;
      state.firstname=action.payload.data.firstname;
      state.lastname=action.payload.data.lastname;
      state.avatar=action.payload.data.avatar;
      state.isAuthenticated=true;
    },
    logoutRedux: (state)=>{
      state.email="";
      state.type="";
      state.firstname="";
      state.lastname="";
      state.avatar="";
      state.isAuthenticated=false;
    },
    cartIn: (state, action) => {
      console.log(action.payload.data);
      state.cart.push(action.payload.data);
    },
    cartOut: (state, action) => {
      console.log(action.payload.data);
      state.cart.pop(action.payload.data);
    }
  }
});

export const { loginRedux,logoutRedux,cartIn } = userSlice.actions;
export default userSlice.reducer;