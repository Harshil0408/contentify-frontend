import type { ErrorResponseThunk, GetLikedVideosResponse, GetRecommendedVideosResponse, GetUserVideosResponse, GetVideoByIdResponse, GetVideoProgressResponse, GetVideosResponse, GetWatchHistoryResponse, LikeVideoResponse, PublishVideoForm, ToggleSubscribeVideoResponse, UpdateWatchProgressPayload, UpdateWatchProgressResponse } from "@/types/types";
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

export const getAllVideos = createAsyncThunk<GetVideosResponse["data"], void>(
    'video/getAllVideo',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get<GetVideosResponse>('/video')
            return response.data?.data
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.request.data)
            }
            return rejectWithValue(error)
        }
    }
)

export const getSingleVideo = createAsyncThunk<GetVideoByIdResponse["data"], string>(
    'video/getSingleVideo',
    async (videoId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get<GetVideoByIdResponse>(`/video/${videoId}`)
            return response.data?.data
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data)
            }
            return rejectWithValue(error)
        }
    }
)

export const getUserWatchHistory = createAsyncThunk<GetWatchHistoryResponse, void>(
    'video/getUserWatchHistory',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get<GetWatchHistoryResponse>('/video/video/getWatchHistory')
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data)
            }
            return rejectWithValue(error)
        }
    }
)

export const toggleLikeVideo = createAsyncThunk<LikeVideoResponse<null>, string>(
    'video/toggleLikeVideo',
    async (videoId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post<LikeVideoResponse<null>>(`/like/like-video/${videoId}`)
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data)
            }
            return rejectWithValue(error)
        }
    }
)

export const getRecommandedVideosForUser = createAsyncThunk<GetRecommendedVideosResponse, string>(
    'video/getRecommandedVideos',
    async (videoId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get<GetRecommendedVideosResponse>(`/video/recommend-video?currentVideoId=${videoId}`)
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data)
            }
            return rejectWithValue(error)
        }
    }
)

export const toggleSubscribeVideo = createAsyncThunk<ToggleSubscribeVideoResponse<null>, string>(
    '/video/toggleSubscribeVideo',
    async (channelId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post<ToggleSubscribeVideoResponse<null>>(`/subscription/toggle-subscribe/${channelId}`)
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data)
            }
            return rejectWithValue(error)
        }
    }
)

export const updateVideoWatchProgress = createAsyncThunk<UpdateWatchProgressResponse, UpdateWatchProgressPayload, { rejectValue: ErrorResponseThunk }>(
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
            return rejectWithValue({
                statusCode: 500,
                message: error as string,
                success: false,
            });
        }
    }
)

export const getVideoWatchProgress = createAsyncThunk<GetVideoProgressResponse, void>(
    'video/getVideoWatchProgress',
    async (_,
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosInstance.get<GetVideoProgressResponse>(`/video/video/watch-progress`)
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data)
            }
            return rejectWithValue(error)
        }
    }
)

export const getLikedVideosOfUser = createAsyncThunk<GetLikedVideosResponse, void>(
    'video/getLikedVideoOfUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get<GetLikedVideosResponse>('/video/like-videos/user')
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data)
            }
            return rejectWithValue(error)
        }
    }
)

export const getUsersVideo = createAsyncThunk<GetUserVideosResponse, void>(
    'video/getUsersVideo',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get<GetUserVideosResponse>('/video/user/user-videos')
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data)
            }
            return rejectWithValue(error)
        }
    }
)
