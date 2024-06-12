import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { localhostURL } from "../../utils/url";

const login = createAsyncThunk(
    "adminSlice/login",
    async ({ email, password, toast }, { rejectWithValue }) => {
        if (email.trim() === "" || password.trim() === "") {
            toast.error("All the fields are required!", { hideProgressBar: true, autoClose: 3000 });
            return rejectWithValue("all fields are required");
        } else {
            try {
                const response = await axios.post(`${localhostURL}/admin/login`, { email, password });
                if (response.data === "EmailNotFound") {
                    toast.error("Email not found", { hideProgressBar: true, autoClose: 3000 });
                    return rejectWithValue("EmailNotFound");
                } else if (response.data === "wrongpassword") {
                    toast.error("Entered password is wrong", { hideProgressBar: true, autoClose: 3000 });
                    return rejectWithValue("wrongpassword");
                } else {
                    return response.data;
                }
            } catch (error) {
                return rejectWithValue(error.response.data);
            }
        }
    }
);

const fetchUser = createAsyncThunk(
    "adminSlice/fetchUser",
    async () => {
        const token = JSON.parse(localStorage.getItem("admin-token"));
        const response = await axios.get(`${localhostURL}/fetchuser`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response.data;
    }
);

export const deleteUser = createAsyncThunk(
    "adminSlice/deleteUser",
    async ({ id, toast }, { rejectWithValue }) => {
        try {
            const token = JSON.parse(localStorage.getItem("admin-token"));
            const response = await axios.delete(`${localhostURL}/admin/deleteUser`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: { userID: id }
            });
            if (response.data.deletedCount === 1) {
                return id;
            } else if (response.data === "Access_denied" || response.data === "authentication_failed") {
                toast.error("Access denied please login again", { hideProgressBar: true, autoClose: 3000 });
                return rejectWithValue("Access_denied");
            } else {
                throw new Error("User deletion failed, please try again later");
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export {
    login,
    fetchUser
};
