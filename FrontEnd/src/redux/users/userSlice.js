import { createSlice } from "@reduxjs/toolkit"
import { userVerification, editProfile } from "./userThunk"

const userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem('userData')) : null;
const token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null;


const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        userData: userData,
        token: token,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userVerification.fulfilled, (state, action) => {
                const { userData, token } = action.payload
                console.log(token);
                state.userData = userData;
                state.token = token;
                localStorage.setItem("userData", JSON.stringify(userData));
                localStorage.setItem("token", JSON.stringify(token));
            })
            .addCase(userVerification.rejected, (state) => {
                state.userData = null;
                state.token = null;
            })
            .addCase(editProfile.fulfilled, (state, action) => {
                const { username } = action.payload;
                state.userData.username = username;
                state.editConfirm = true;
                localStorage.setItem("userData", JSON.stringify(state.userData));
              })
    }
})

export default userSlice.reducer