import { createSlice } from "@reduxjs/toolkit";
import { login, fetchUser, deleteUser } from "./adminThunk";

const getInitialToken = () => {
  const token = localStorage.getItem("admin-token");
  return token ? JSON.parse(token) : false;
};

const initialState = {
  adminData: [],
  adminToken: getInitialToken(),
};

const adminSlice = createSlice({
  name: "adminSlice",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.adminData = [];
      state.adminToken = false;
      localStorage.removeItem('admin-token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const newToken = action.payload;
        state.adminToken = newToken;
        localStorage.setItem("admin-token", JSON.stringify(newToken));
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        const userList = action.payload;
        state.usersList = userList;
        state.adminData = userList;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const deletedUserID = action.payload;
        state.usersList = state.usersList.filter((user) => user._id != deletedUserID && user);
        state.adminData = state.adminData.filter((user) => user._id != deletedUserID && user);
      })
  },
});

export const { logoutUser } = adminSlice.actions;
export default adminSlice.reducer;
