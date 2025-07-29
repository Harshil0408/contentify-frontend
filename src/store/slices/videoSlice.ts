import { createSlice } from "@reduxjs/toolkit";
import {
    getAllVideos,
    getSingleVideo,
    getUserWatchHistory,
    toggleLikeVideo,
    getRecommandedVideosForUser,
    toggleSubscribeVideo,
    getVideoWatchProgress,
    getLikedVideosOfUser,
    getUsersVideo,
    updateVideoWatchProgress,
    getSubscribedChannelVideos,
} from "../thunks/videoThunk";

import type {
    RecommendedVideo,
    WatchProgress,
    LikedVideo,
    PaginatedVideoData,
    VideoPaginationData,
    VideoDetail,
    VideoListItem,
    SubscribedVideoData,
} from "../../types/types";

type VideosSliceState = {
    allVideos: VideoPaginationData | null;
    singleVideo: VideoDetail | null;
    watchHistory: VideoListItem[] | [];
    recommendedVideos: RecommendedVideo[];
    videoWatchProgress: { [videoId: string]: WatchProgress };
    likedVideos: LikedVideo[];
    userVideos: PaginatedVideoData | null;
    subscribedChannelVideos: SubscribedVideoData | null,
    isLoading: boolean;
    error: string | null;
};

const initialState: VideosSliceState = {
    allVideos: null,
    singleVideo: null,
    watchHistory: [],
    recommendedVideos: [],
    videoWatchProgress: {},
    likedVideos: [],
    userVideos: null,
    subscribedChannelVideos: null,
    isLoading: false,
    error: null,
};

export const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(getAllVideos.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getAllVideos.fulfilled, (state, action) => {
            state.allVideos = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getAllVideos.rejected, (state, action) => {
            state.error = (action.payload as string) ?? "Failed to fetch videos";
            state.isLoading = false;
        });

        builder.addCase(getSingleVideo.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getSingleVideo.fulfilled, (state, action) => {
            state.singleVideo = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getSingleVideo.rejected, (state, action) => {
            state.error = (action.payload as string) ?? "Failed to fetch video";
            state.isLoading = false;
        });

        builder.addCase(getUserWatchHistory.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getUserWatchHistory.fulfilled, (state, action) => {
            state.watchHistory = action.payload.data;
            state.isLoading = false;
        });
        builder.addCase(getUserWatchHistory.rejected, (state, action) => {
            state.error = (action.payload as string) ?? "Failed to fetch watch history";
            state.isLoading = false;
        });

        builder.addCase(toggleLikeVideo.fulfilled, (state) => {
            if (state.singleVideo) {
                state.singleVideo.isLiked = !state.singleVideo.isLiked
                if (state.singleVideo.isLiked === true) {
                    state.singleVideo.likeCount += 1
                } else {
                    state.singleVideo.likeCount -= 1
                }
            }
        });

        builder.addCase(getRecommandedVideosForUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getRecommandedVideosForUser.fulfilled, (state, action) => {
            state.recommendedVideos = action.payload.data;
            state.isLoading = false;
        });
        builder.addCase(getRecommandedVideosForUser.rejected, (state, action) => {
            state.error = (action.payload as string) ?? "Failed to fetch recommended videos";
            state.isLoading = false;
        });

        builder.addCase(toggleSubscribeVideo.fulfilled, (state) => {
            if (state.singleVideo) {
                state.singleVideo.isSubscribed = !state.singleVideo.isSubscribed
            }
        });

        builder.addCase(getVideoWatchProgress.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getVideoWatchProgress.fulfilled, (state, action) => {
            state.videoWatchProgress = action.payload.data;
            state.isLoading = false;
        });
        builder.addCase(getVideoWatchProgress.rejected, (state, action) => {
            state.error = (action.payload as string) ?? "Failed to fetch video progress";
            state.isLoading = false;
        });

        builder.addCase(updateVideoWatchProgress.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        builder.addCase(updateVideoWatchProgress.fulfilled, (state, action) => {
            const progress = action.payload.data;
            state.videoWatchProgress[progress.video] = progress
        })
        builder.addCase(updateVideoWatchProgress.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.message as string
        })

        builder.addCase(getLikedVideosOfUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getLikedVideosOfUser.fulfilled, (state, action) => {
            state.likedVideos = action.payload.data.videos;
            state.isLoading = false;
        });
        builder.addCase(getLikedVideosOfUser.rejected, (state, action) => {
            state.error = (action.payload as string) ?? "Failed to fetch liked videos";
            state.isLoading = false;
        });

        // User's Videos
        builder.addCase(getUsersVideo.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getUsersVideo.fulfilled, (state, action) => {
            state.userVideos = action.payload.data;
            state.isLoading = false;
        });
        builder.addCase(getUsersVideo.rejected, (state, action) => {
            state.error = (action.payload as string) ?? "Failed to fetch user's videos";
            state.isLoading = false;
        });
        builder.addCase(getSubscribedChannelVideos.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        builder.addCase(getSubscribedChannelVideos.fulfilled, (state, action) => {
            state.subscribedChannelVideos = action.payload.data;
            state.error = null;
            state.isLoading = false
        })
        builder.addCase(getSubscribedChannelVideos.rejected, (state, action) => {
            state.error = (action.payload as string) ?? "Something went wrong";
            state.isLoading = false
        })
    },
});

export default videoSlice.reducer;
