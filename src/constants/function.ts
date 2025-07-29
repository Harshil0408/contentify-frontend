
import axiosInstance from "@/utils/axios"

export const setAuthToken = (token: string | null) => {
    if (token) {
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`
        console.log("Auth Header Set:", axiosInstance.defaults.headers.common["Authorization"]);
    } else {
        delete axiosInstance.defaults.headers.common["Authorization"]
    }
}

export function formatViews(views: number) {
    if (views < 1000) return `${views} views`;
    if (views < 1_000_000) return `${(views / 1000).toFixed(0)}K views`;
    return `${(views / 1_000_000).toFixed(1)}M views`;
}

export function timeAgo(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;
    return date.toLocaleDateString();
}

export function formatDuration(duration: string) {
    const sec = parseInt(duration, 10);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
}