import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleVideo, getRecommandedVideosForUser, toggleLikeVideo, toggleSubscribeVideo, getVideoWatchProgress } from "@/store/thunks/videoThunk";
import type { AppDispatch, RootState } from "@/store/store";
import VideoPlayer from "@/components/VideoPlayer";
import VideoActions from "@/components/VideoActions";
import ChannelInfo from "@/components/ChannelInfo";
import VideoDescription from "@/components/VideoDescription";
import RecommendedVideo from "@/components/RecommendedVideo";
import CommentsSection from "@/components/CommentSection";

const Video = () => {
    const { videoId } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { singleVideo, videoWatchProgress } = useSelector((state: RootState) => state.video);
    const [lastSentTime, setLastSentTime] = useState<number>(0);
    const [isLiking, setIsLiking] = useState(false);

    const sendWatchProgress = useCallback(async () => {
        if (!videoId) return;
        const video = document.querySelector("video");
        if (!video) return;

        const currentTime = video.currentTime;
        const duration = video.duration;

        const now = Date.now();
        if (now - lastSentTime < 15000 && currentTime !== duration) return;
        setLastSentTime(now);
        // await dispatch(updateVideoWatchProgress({ videoId, watchedTime: Math.floor(currentTime) }));
    }, [videoId, lastSentTime]);

    const handleLike = async () => {
        if (!singleVideo) return;
        try {
            setIsLiking(true);
            await dispatch(toggleLikeVideo(singleVideo._id));
        } finally {
            setIsLiking(false);
        }
    };

    const handleSubscribe = async () => {
        if (!singleVideo?.owner?._id) return;
        try {
            await dispatch(toggleSubscribeVideo(singleVideo.owner._id)).unwrap();

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!videoId) return;
        dispatch(getSingleVideo(videoId));
        dispatch(getRecommandedVideosForUser(videoId));
        dispatch(getVideoWatchProgress());
    }, [videoId]);

    if (!singleVideo) return <div>Loading...</div>;

    return (
        <div style={{ display: "flex", gap: "2rem", padding: "2rem", background: "#f9f9f9" }}>
            <div style={{ flex: 2, maxWidth: 900 }}>
                <VideoPlayer
                    src={singleVideo.videoFile}
                    poster={singleVideo.thumbnail}
                    watchedTime={videoWatchProgress?.[videoId!]?.watchedTime || 0}
                    onProgress={sendWatchProgress}
                />

                <h2 style={{ margin: "1rem 0 0.5rem" }}>{singleVideo.title}</h2>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ color: "#606060" }}>
                        {singleVideo.views} views • {new Date(singleVideo.createdAt).toLocaleDateString()}
                    </div>
                    <VideoActions
                        isLiked={singleVideo.isLiked}
                        likeCount={singleVideo.likeCount}
                        onLike={handleLike}
                        isLiking={isLiking}
                    />
                </div>

                <ChannelInfo
                    owner={singleVideo.owner}
                    isSubscribed={singleVideo.isSubscribed}
                    onSubscribe={handleSubscribe}
                />

                <VideoDescription description={singleVideo.description} />
                <CommentsSection />
            </div>

            <div style={{ flex: 1 }}>
                <h4>Related Videos</h4>
                <RecommendedVideo />
            </div>
        </div>
    );
};

export default Video;
