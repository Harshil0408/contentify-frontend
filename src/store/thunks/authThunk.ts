import { setAuthToken } from "@/constants/function";
import type { OnboardingForm, SignInForm, SignUpFormValues } from "@/types/types";
import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const signUpThunk = createAsyncThunk(
    'auth/signUp',
    async (data: SignUpFormValues, { rejectWithValue }) => {
        try {
            const formData = new FormData()
            formData.append("avatar", data.avatar as File)
            formData.append("fullname", data.fullname)
            formData.append("username", data.username)
            formData.append("email", data.email)
            formData.append("password", data.password)

            const response = await axiosInstance.post("/auth/signup", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            return response.data
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data)
            }
            return rejectWithValue(error)
        }
    }
)

export const signInThunk = createAsyncThunk(
    'auth/signin',
    async (data: SignInForm, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/auth/signin', data)
            setAuthToken(response.data.data.accessToken)
            return response.data
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data)
            }
            return rejectWithValue(error)
        }
    }
)

export const getMeThunk = createAsyncThunk(
    "auth/getMe",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/auth/me")
            return response.data
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data)
            }
        }
    }
)

export const onboardingThunk = createAsyncThunk(
    "auth/onboarding",
    async (data: OnboardingForm, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch("/auth/onboarding", data)
            return response.data
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data)
            }
            return rejectWithValue(error)
        }
    }
)
