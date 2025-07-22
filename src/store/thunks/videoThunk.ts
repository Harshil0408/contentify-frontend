import type { PublishVideoForm } from "@/types/types";
import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";


export const publishVideoThunk = createAsyncThunk(
    'video/publish-video',
    async (data: PublishVideoForm, { rejectWithValue }) => {
        try {

            const formData = new FormData()
            formData.append("videoFile", data.videoFile as File)
            formData.append("title", data.title)
            formData.append("description", data.description)
            formData.append("category", data.category)
            formData.append("thumbnail", data.thumbnail as File)

            const response = await axiosInstance.post('/video/publish-video', formData, {
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

export const getAllVideos = createAsyncThunk(
    'video/getAllVideo',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/video')
            return response.data?.data
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.request.data)
            }
            return rejectWithValue(error)
        }
    }
)

export const getSingleVideo = createAsyncThunk(
    'video/getSingleVideo',
    async (videoId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/video/${videoId}`)
            return response.data?.data
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data)
            }
            return rejectWithValue(error)
        }
    }
)

export const getUserWatchHistory = createAsyncThunk(
    'video/getUserWatchHistory',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/video/video/getWatchHistory')
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data)
            }
            return rejectWithValue(error)
        }
    }
)

export const toggleLikeVideo = createAsyncThunk(
    'video/toggleLikeVideo',
    async (videoId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/like/like-video/${videoId}`)
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data)
            }
            return rejectWithValue(error)
        }
    }
)

export const getRecommandedVideosForUser = createAsyncThunk(
    'video/getRecommandedVideos',
    async (videoId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/video/recommend-video?currentVideoId=${videoId}`)
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data)
            }
            return rejectWithValue(error)
        }
    }
)

export const toggleSubscribeVideo = createAsyncThunk(
    '/video/toggleSubscribeVideo',
    async (channelId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/subscription/toggle-subscribe/${channelId}`)
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data)
            }
            return rejectWithValue(error)
        }
    }
)

export const updateVideoWatchProgress = createAsyncThunk(
    'video/updateVideoWatchProgress',
    async (
        { videoId, watchedTime }: { videoId: string; watchedTime: number },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosInstance.patch('/video/update/watch-progress', {
                videoId,
                watchedTime
            })
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data)
            }
            return rejectWithValue(error)
        }
    }
)

export const getVideoWatchProgress = createAsyncThunk(
    'video/getVideoWatchProgress',
    async (
        { videoId }: { videoId: string; },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosInstance.get(`/video/watch-progress/${videoId}`)
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data)
            }
            return rejectWithValue(error)
        }
    }
)
