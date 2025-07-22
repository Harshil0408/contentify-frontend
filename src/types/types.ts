export interface SignUpFormValues {
    email: string;
    fullname: string;
    username: string;
    password: string;
    avatar: File | null;
}

export interface SignInForm {
    email: string;
    password: string;
}

export interface LoggedInUser {
    _id: string;
    username: string;
    email: string;
    fullname: string;
    avatar: string;
    coverImage: string;
    watchHistory: string[];
    age: string;
    language: string;
    city: string;
    phoneNo: number;
    hobby: string[];
    googleId: string;
    isOnboarded: boolean;
    refreshToken: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface OnboardingForm {
    age: number | null;
    language: string;
    city: string;
    phoneNo: number | null;
    hobby: string[];
}

export interface PublishVideoForm {
    videoFile: File | null;
    title: string;
    description: string;
    category: string;
    thumbnail: File | null;
}

export interface UploadVideoProps {
    open: boolean;
    onClose: () => void;
}


export interface VideoDoc {
    _id: string;
    title: string;
    description: string;
    videoFile: string;
    thumbnail: string;
    duration: string;
    owner: string;
    views: number;
    avatar: string;
    username: string
    createdAt: string;
}

export interface VideoState {
    docs: VideoDoc[];
    totalDocs: number;
    limit: number;
    page: number;
    totalPages: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}

interface Owner {
    _id: string;
    username: string;
    avatar: string;
}

export interface SingleVideo {
    _id: string;
    title: string;
    description: string;
    videoFile: string;
    videoPublicId: string;
    thumbnail: string;
    thumbnailPublicId: string;
    duration: string;
    category: string;
    owner: Owner;
    downloads: number;
    tags: string[];
    isPublished: boolean;
    isDeleted: boolean;
    isPrivate: boolean;
    allowedUsers: string[];
    reportedBy: string[];
    reportReason: string;
    language: string;
    averageWatchTime: number;
    createdAt: string;
    updatedAt: string;
    likeCount: number;
    views: number;
    isLiked: boolean;
    isSubscribed: boolean;
}


export interface WatchedVideo {
    _id: string;
    title: string;
    thumbnail: string;
    duration: string;
    owner: Owner;
    views: number;
    createdAt: string;
}

export interface WatchHistoryResponse {
    data: WatchedVideo[];
}

export type RecommendedVideos = SingleVideo[]

export interface WatchProgress {
    _id: string;
    user: string;
    video: string;
    watchedTime: number;
    videoDuration: number;
    watchPercentage: number;
    viewedAt: string;
}