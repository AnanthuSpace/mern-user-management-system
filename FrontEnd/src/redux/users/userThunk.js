import axios from "axios";
import { localhostURL } from "../../utils/url";
import { createAsyncThunk } from '@reduxjs/toolkit'


const registration = async ({ username, email, password, repassword, toast }) => {
    username = username.trim()
    email = email.trim()
    password = password.trim()
    repassword = repassword.trim()

    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (username === "" || email === "" || password === "" || repassword === "") {
        toast.warning("All the fields are required!", { hideProgressBar: true, autoClose: 3000 });
    } else if (!usernameRegex.test(username)) {
        toast.warning("Name must be between 3 to 20 characters and contain only letters!", { hideProgressBar: true, autoClose: 3000 });
    } else if (!emailRegex.test(email)) {
        toast.warning("Invalid email address!", { hideProgressBar: true, autoClose: 3000 });
    } else if (password.length < 6) {
        toast.warning("Password must be at least 6 characters long!", { hideProgressBar: true, autoClose: 3000 });
    } else if (password !== repassword) {
        toast.warning("Password and confirm password do not match!", { hideProgressBar: true, autoClose: 3000 });
    } else {
        const response = await axios.post(`${localhostURL}/signup`, { username, email, password })
        if (response.data === "UserExist") {
            toast.error("User already exist", { hideProgressBar: true, autoClose: 3000 });
        } else {
            toast.success("Registration completed successfully", { hideProgressBar: true, autoClose: 2500 });
            return "success";
        }
    }
}


const userVerification = createAsyncThunk(
    "userSlice/userVerification",
    async ({ email, password, toast }, { rejectWithValue }) => {
        console.log(email, password);
        try {
            password = password.trim();
            email = email.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (email === "" || password === "") {
                toast.error("All fields are required", { hideProgressBar: true, autoClose: 3000 });
                return rejectWithValue("All fields are required");
            } else if (!emailPattern.test(email)) {
                toast.error("Please enter a valid email address", { hideProgressBar: true, autoClose: 3000 });
                return rejectWithValue("Invalid email address");
            } else if (password.length < 6) {
                toast.error("Password must be at least 6 characters", { hideProgressBar: true, autoClose: 3000 });
                return rejectWithValue("Password too short");
            } else {
                const response = await axios.post(`${localhostURL}/login`, { email, password });
                if (response.data === "notFound") {
                    toast.error("User not found", { hideProgressBar: true, autoClose: 3000 });
                    return rejectWithValue("User not found");
                } else if (response.data === "wrongPassword") {
                    toast.error("Password is wrong", { hideProgressBar: true, autoClose: 3000 });
                    return rejectWithValue("Incorrect password");
                } else {
                    return response.data;
                }
            }
        } catch (error) {
            toast.error("Something went wrong, please try again later", { hideProgressBar: true, autoClose: 3000 });
            return rejectWithValue(error.message);
        }
    }
)


const editProfile = createAsyncThunk(
    "userSlice/editProfile",
    async ({ formData, username, toast }, { rejectWithValue }) => {
        try {
            username = username.trim();
            const nameRegex = /^[a-zA-Z\s]{3,20}$/;
            if (username === "") {
                toast.warning("All the fields are required!", { hideProgressBar: true, autoClose: 3000 });
                return rejectWithValue("All the fields are required!");
            } else if (!nameRegex.test(username)) {
                toast.warning("Name must be between 3 to 20 characters and contain only letters!", { hideProgressBar: true, autoClose: 3000 });
                return rejectWithValue("Invalid name format!");
            } else {
                console.log(username);
                const token = JSON.parse(localStorage.getItem("token"));
                const response = await axios.post(`${localhostURL}/editProfile`, username, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (response.data.acknowledged === true && response.data.modifiedCount == 1) {
                    toast.success("Update changes successfully", { hideProgressBar: true, autoClose: 3000 });
                    return { username };
                } else if (response.data === "Access_denied") {
                    toast.warning("Access_denied", { hideProgressBar: true, autoClose: 3000 });
                    return rejectWithValue("Access_denied");
                } else if (response.data === "authentication_failed") {
                    toast.warning("Authentication failed please login again", { hideProgressBar: true, autoClose: 3000 });
                    return rejectWithValue("Access_denied");
                } else {
                    toast.warning("No changes detected", { hideProgressBar: true, autoClose: 3000 });
                    return rejectWithValue("No changes found");
                }
            }
        } catch (error) {
            console.error("Error: ", error);
            toast.error("Something went wrong, please try again later", { hideProgressBar: true, autoClose: 3000 });
            return rejectWithValue(error.message);
        }
    }
)


export {
    registration,
    userVerification,
    editProfile
}


