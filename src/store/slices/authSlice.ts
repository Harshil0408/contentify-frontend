import { createSlice } from "@reduxjs/toolkit"
import { getMeThunk, onboardingThunk, signInThunk, signUpThunk } from "../thunks/authThunk"
import type { LoggedInUser } from "@/types/types";

interface authState {
    token: string | null;
    isLoading: boolean;
    error: string | null;
    loggedInUser: LoggedInUser | null;
}

const initialState: authState = {
    token: null,
    isLoading: false,
    error: null,
    loggedInUser: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setTokens: (state, action) => {
            const token = action.payload;
            localStorage.setItem("token", token);
            state.token = token;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signUpThunk.pending, (state) => {
            return {
                ...state,
                isLoading: true
            }
        })
        builder.addCase(signUpThunk.fulfilled, (state, action) => {
            return {
                ...state,
                isLoading: false,
                user: action.payload.user,
                token: action.payload.token,
            }
        })
        builder.addCase(signUpThunk.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: (action.payload as string) ?? 'Something went wrong'
            }
        })
        builder.addCase(signInThunk.pending, (state) => {
            return {
                ...state,
                isLoading: true
            }
        })
        builder.addCase(signInThunk.fulfilled, (state, action) => {
            return {
                ...state,
                loggedInUser: action.payload.data.user,
                token: action.payload.data.accessToken,
                isLoading: false
            }
        })
        builder.addCase(signInThunk.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: (action.payload as string) ?? "Something went wrong"
            }
        })
        builder.addCase(getMeThunk.pending, (state) => {
            return {
                ...state,
                isLoading: true
            }
        })
        builder.addCase(getMeThunk.fulfilled, (state, action) => {
            return {
                ...state,
                isLoading: false,
                loggedInUser: action.payload.user,
            }
        })
        builder.addCase(getMeThunk.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: (action.payload as string) ?? "Something went wrong"
            }
        })
        builder.addCase(onboardingThunk.pending, (state) => {
            return {
                ...state,
                isLoading: false
            }
        })
        builder.addCase(onboardingThunk.fulfilled, (state, action) => {
            console.log("payload", action.payload)
            return {
                ...state,
                loggedInUser: {
                    ...state.loggedInUser,
                    ...action.payload.data
                },
                isLoading: false
            }
        })
        builder.addCase(onboardingThunk.rejected, (state, action) => {
            return {
                ...state,
                error: (action.payload as string) ?? "Something went wrong",
                isLoading: false
            }
        })
    }
})


export const { setTokens } = authSlice.actions