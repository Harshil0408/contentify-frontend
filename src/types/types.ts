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


export interface ErrorResponseThunk {
    statusCode: number;
    message: string;
    success: boolean;
}

export interface Video {
    _id: string;
    title: string;
    description: string;
    videoFile: string;
    thumbnail: string;
    duration: string;
    owner: string;
    views: number;
    createdAt: string;
    username: string;
    avatar: string;
}

export interface VideoPaginationData {
    docs: Video[];
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

export interface GetVideosResponse {
    statusCode: number;
    data: VideoPaginationData;
    message: string;
    success: boolean;
}

export interface VideoDetail {
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
    views: number;
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
    isLiked: boolean;
    isSubscribed: boolean;
}

export interface GetVideoByIdResponse {
    statusCode: number;
    data: VideoDetail;
    message: string;
    success: boolean;
}

export interface VideoListItem {
    _id: string;
    title: string;
    thumbnail: string;
    duration: string;
    owner: Owner;
    views: number;
    createdAt: string;
}

export interface GetWatchHistoryResponse {
    statusCode: number;
    data: VideoListItem[];
    message: string;
    success: boolean;
}


export interface RecommendedVideo {
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
    views: number;
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
    __v: number;
}

export interface GetRecommendedVideosResponse {
    statusCode: number;
    data: RecommendedVideo[];
    message: string;
    success: boolean;
}

export interface WatchProgress {
    _id: string;
    user: string;
    video: string;
    watchedTime: number;
    videoDuration: number;
    watchPercentage: number;
    viewedAt: string;
}


export interface GetVideoProgressResponse {
    statusCode: number;
    data: {
        [videoId: string]: WatchProgress;
    };
    message: string;
    success: boolean;
}

export interface LikedVideo {
    _id: string;
    likedAt: string;
    videoId: string;
    title: string;
    thumbnail: string;
    views: number;
    duration: string;
    owner: Owner;
}

export interface LikedVideosData {
    totalLikedVideos: number;
    videos: LikedVideo[];
}

export interface GetLikedVideosResponse {
    statusCode: number;
    data: LikedVideosData;
    message: string;
    success: boolean;
}

export interface UserVideo {
    _id: string;
    title: string;
    description: string;
    videoFile: string;
    thumbnail: string;
    duration: string;
    owner: Owner;
    views: number;
    createdAt: string;
    likesCount: number;
}

export interface PaginatedVideoData {
    docs: UserVideo[];
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

export interface GetUserVideosResponse {
    statusCode: number;
    data: PaginatedVideoData;
    message: string;
    success: boolean;
}

export interface LikeVideoResponse<T> {
    statusCode: number;
    data: T;
    message: string;
    success: boolean;
}

export interface ToggleSubscribeVideoResponse<T> {
    statusCode: number;
    data: T;
    message: string;
    success: boolean;
}

export interface WatchProgress {
    _id: string;
    user: string;
    video: string;
    watchedTime: number;
    videoDuration: number;
    watchPercentage: number;
    viewedAt: string;
    __v?: number;
}

export interface UpdateWatchProgressResponse {
    statusCode: number;
    message: string;
    success: boolean;
    data: WatchProgress;
}
export interface UpdateWatchProgressPayload {
    videoId: string;
    watchedTime: number;
}

export interface SubscribedVideosResponse {
    statusCode: number;
    data: SubscribedVideoData;
    message: string;
    success: boolean;
  }
  
  export interface SubscribedVideoData {
    docs: VideoDocument[];
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
  
  export interface VideoDocument {
    _id: string;
    title: string;
    description: string;
    videoFile: string;
    videoPublicId: string;
    thumbnail: string;
    thumbnailPublicId: string;
    duration: string;
    category: string;
    owner: string;
    views: number;
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
    __v: number;
  }
  