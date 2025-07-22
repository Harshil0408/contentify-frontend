import type { RecommendedVideos, SingleVideo, VideoState, WatchHistoryResponse, WatchProgress } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import { getAllVideos, getRecommandedVideosForUser, getSingleVideo, getUserWatchHistory, getVideoWatchProgress, toggleLikeVideo, toggleSubscribeVideo } from "../thunks/videoThunk";

export type VideosSliceState = {
    allVideos: VideoState | null;
    singleVideo: SingleVideo | null;
    watchHistory: WatchHistoryResponse | [];
    recommendedVideos: RecommendedVideos | [];
    videoWatchProgress: WatchProgress | null;
    isLoading: boolean;
    error: string | null
};

const initialState: VideosSliceState = {
    allVideos: null,
    singleVideo: null,
    watchHistory: [],
    recommendedVideos: [],
    videoWatchProgress: null,
    isLoading: false,
    error: null
};

export const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAllVideos.pending, (state) => {
            return {
                ...state,
                isLoading: true,
                error: null
            }
        })
        builder.addCase(getAllVideos.fulfilled, (state, action) => {
            return {
                ...state,
                allVideos: action.payload,
                isLoading: false,
                error: null
            }
        })
        builder.addCase(getAllVideos.rejected, (state, action) => {
            return {
                ...state,
                error: (action.payload as string) ?? "Something went wrong",
                isLoading: false
            }
        })
        builder.addCase(getSingleVideo.pending, (state) => {
            return {
                ...state,
                isLoading: true,
                error: null
            }
        })
        builder.addCase(getSingleVideo.fulfilled, (state, action) => {
            return {
                ...state,
                singleVideo: action.payload,
                error: null
            }
        })
        builder.addCase(getSingleVideo.rejected, (state, action) => {
            return {
                ...state,
                error: (action.payload as string) ?? "Something went wrong",
                isLoading: false
            }
        })
        builder.addCase(getUserWatchHistory.pending, (state) => {
            return {
                ...state,
                isLoading: true,
                error: null
            }
        })
        builder.addCase(getUserWatchHistory.fulfilled, (state, action) => {
            return {
                ...state,
                watchHistory: action.payload.data,
                isLoading: false,
                error: null
            }
        })
        builder.addCase(getUserWatchHistory.rejected, (state, action) => {
            return {
                ...state,
                error: (action.payload as string) ?? "Something went wrong",
                isLoading: false
            }
        })
        builder.addCase(toggleLikeVideo.pending, (state) => {
            return {
                ...state,
                isLoading: true
            }
        })
        builder.addCase(toggleLikeVideo.fulfilled, (state) => {
            if (state.singleVideo) {
                state.singleVideo = {
                    ...state.singleVideo,
                    isLiked: !state.singleVideo.isLiked
                };
            }
        })
        builder.addCase(toggleLikeVideo.rejected, (state, action) => {
            return {
                ...state,
                error: (action.payload as string) ?? "Something went wrong"
            }
        })
        builder.addCase(getRecommandedVideosForUser.pending, (state) => {
            return {
                ...state,
                isLoading: true,
                error: null
            }
        })
        builder.addCase(getRecommandedVideosForUser.fulfilled, (state, action) => {
            return {
                ...state,
                recommendedVideos: action.payload?.data,
                isLoading: false,
                error: null
            }
        })
        builder.addCase(getRecommandedVideosForUser.rejected, (state, action) => {
            return {
                ...state,
                error: (action.payload as string) ?? "Something went wrong",
                isLoading: false
            }
        })
        builder.addCase(toggleSubscribeVideo.pending, (state) => {
            return {
                ...state,
                isLoading: true,
                error: null
            }
        })
        builder.addCase(toggleSubscribeVideo.fulfilled, (state) => {
            if (state.singleVideo) {
                state.singleVideo = {
                    ...state.singleVideo,
                    isSubscribed: !state.singleVideo?.isSubscribed
                }
            }
        })
        builder.addCase(toggleSubscribeVideo.rejected, (state, action) => {
            return {
                ...state,
                error: (action.payload as string) ?? "Something went wrong"
            }
        })
        builder.addCase(getVideoWatchProgress.pending, (state) => {
            return {
                ...state,
                isLoading: true
            }
        })
        builder.addCase(getVideoWatchProgress.fulfilled, (state, action) => {
            return {
                ...state,
                videoWatchProgress: action.payload.data,
                isLoading: false
            }
        })
        builder.addCase(getVideoWatchProgress.rejected, (state, action) => {
            return {
                ...state,
                error: (action.payload as string) ?? "Something went wrong",
                isLoading: false
            }
        })
    }
})
