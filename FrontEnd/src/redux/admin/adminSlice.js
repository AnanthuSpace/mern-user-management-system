import { createSlice } from "@reduxjs/toolkit";
import { login, fetchUser, deleteUser, updateUser } from "./adminThunk";

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
  initialState : initialState,
  reducers: {
    logoutAdmin: (state) => {
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
        state.adminData = userList;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const deletedUserID = action.payload;
        state.adminData = state.adminData.filter((user) => user._id != deletedUserID && user);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const { id, name } = action.payload;
        state.adminData = state.adminData.map((user) => user._id == id ? { ...user, name: name } : user);
      })
  },
});

export const { logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
