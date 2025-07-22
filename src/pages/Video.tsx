import type { AppDispatch, RootState } from "@/store/store"
import { getRecommandedVideosForUser, getSingleVideo, getVideoWatchProgress, toggleLikeVideo, toggleSubscribeVideo, updateVideoWatchProgress } from "@/store/thunks/videoThunk"
import { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { MdThumbUp, MdThumbDown, MdShare, MdDownload, MdPlaylistAdd } from "react-icons/md"
import RecommendedVideo from "@/components/RecommendedVideo"
import { socket } from "@/utils/socket"

const Video = () => {

    const { videoId } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const { singleVideo } = useSelector((state: RootState) => state.video)
    const watchedTime = useSelector((state: RootState) => state.video.videoWatchProgress)
    const [descExpanded, setDescExpanded] = useState(false)
    const [isLiking, setIsLiking] = useState(false)
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const [lastSentTime, setlastSentTime] = useState<number>(0)
    

    const toggleLikeVideoFunc = async (videoId: string) => {
        try {
            setIsLiking(true)
            await dispatch(toggleLikeVideo(videoId))
        } catch (error) {
            console.log(error)
        } finally {
            setIsLiking(false)
        }
    }

    const handleSubscribe = async () => {
        try {
            const response = await dispatch(toggleSubscribeVideo(singleVideo?.owner._id as string)).unwrap()

            if (response.message === "Channel subscribed") {
                socket.emit("new-subscription", {
                    channelId: singleVideo?.owner._id,
                    videoTitle: singleVideo?.title,
                })
            }

        } catch (error) {
            console.log(error)
        }
    }

    const sendWatchProgress = useCallback(async () => {
        if (!videoRef.current || !videoId) return;

        const currentTime = videoRef.current.currentTime;
        const duration = videoRef.current.duration;


        if (currentTime - lastSentTime < 15 && currentTime !== duration) return;
        setlastSentTime(currentTime)

        try {
            if (videoId) {
                await dispatch(updateVideoWatchProgress({
                    videoId,
                    watchedTime: Math.floor(currentTime),
                }))
            }
        } catch (error) {
            console.log(error)
        }

    }, [videoId, lastSentTime])

    useEffect(() => {
        if (videoId) {
            dispatch(getSingleVideo(videoId))
            dispatch(getRecommandedVideosForUser(videoId))
        }
    }, [videoId, dispatch])

    useEffect(() => {
        const interval = setInterval(() => {
            sendWatchProgress();
        }, 15000);

        return () => clearInterval(interval);
    }, [sendWatchProgress]);


    useEffect(() => {
        if (videoId) {
            dispatch(getVideoWatchProgress({ videoId }));
        }
    }, [videoId, dispatch]);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement || !watchedTime) return;

        const handleLoadedMetadata = () => {
            if (watchedTime.watchedTime < videoElement.duration) {
                videoElement.currentTime = watchedTime.watchedTime;
            }
        };

        videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
            videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, [watchedTime]);


    if (!singleVideo) return <div>Loading...</div>

    return (
        <div style={{ display: "flex", gap: "2rem", padding: "2rem", background: "#f9f9f9" }}>
            <div style={{ flex: 2, maxWidth: 900 }}>
                <video
                    ref={videoRef}
                    src={singleVideo.videoFile}
                    poster={singleVideo.thumbnail}
                    controls
                    onTimeUpdate={sendWatchProgress}
                    onEnded={sendWatchProgress}
                    style={{ width: "100%", borderRadius: "12px", background: "#000" }}
                />

                <h2 style={{ margin: "1rem 0 0.5rem" }}>{singleVideo.title}</h2>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ color: "#606060" }}>
                        <span>{singleVideo.views} views</span>
                        <span> • {new Date(singleVideo.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <div style={{ display: "flex", alignItems: "center", background: "#f2f2f2", borderRadius: 24 }}>
                            <button
                                disabled={isLiking}
                                title="Like"
                                onClick={() => toggleLikeVideoFunc(singleVideo._id)}
                                className={`flex items-center gap-1 px-4 py-2 rounded-full border transition font-medium ${singleVideo?.isLiked ? "bg-red-600 cursor-pointer border-red-600 text-white shadow" : "bg-white cursor-pointer border-gray-300 text-gray-800 hover:bg-gray-100"}`}
                            >
                                <MdThumbUp
                                    size={22}
                                    className={singleVideo.isLiked ? "text-white" : "text-gray-600"}
                                    style={singleVideo.isLiked ? { transform: "scale(1.1)" } : {}}
                                />
                                <span className="ml-1 font-semibold">{singleVideo.likeCount}</span>
                            </button>
                            <button
                                title="Dislike"
                                style={{
                                    background: "none",
                                    border: "none",
                                    padding: "8px 16px",
                                    borderRadius: 24,
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    transition: "background 0.2s",
                                }}
                                onMouseOver={e => (e.currentTarget.style.background = "#e5e5e5")}
                                onMouseOut={e => (e.currentTarget.style.background = "none")}
                            >
                                <MdThumbDown size={24} />
                            </button>
                        </div>
                        <div style={{ width: 1, height: 32, background: "#ddd", margin: "0 8px" }} />
                        <button
                            title="Share"
                            style={{
                                background: "none",
                                border: "none",
                                padding: "8px 16px",
                                borderRadius: 24,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                transition: "background 0.2s",
                            }}
                            onMouseOver={e => (e.currentTarget.style.background = "#e5e5e5")}
                            onMouseOut={e => (e.currentTarget.style.background = "none")}
                        >
                            <MdShare size={24} />
                        </button>
                        <button
                            title="Download"
                            style={{
                                background: "none",
                                border: "none",
                                padding: "8px 16px",
                                borderRadius: 24,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                transition: "background 0.2s",
                            }}
                            onMouseOver={e => (e.currentTarget.style.background = "#e5e5e5")}
                            onMouseOut={e => (e.currentTarget.style.background = "none")}
                        >
                            <MdDownload size={24} />
                        </button>
                        <button
                            title="Save"
                            style={{
                                background: "none",
                                border: "none",
                                padding: "8px 16px",
                                borderRadius: 24,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                transition: "background 0.2s",
                            }}
                            onMouseOver={e => (e.currentTarget.style.background = "#e5e5e5")}
                            onMouseOut={e => (e.currentTarget.style.background = "none")}
                        >
                            <MdPlaylistAdd size={24} />
                        </button>
                    </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", margin: "1.5rem 0 1rem" }}>
                    <img
                        src={singleVideo.owner.avatar}
                        alt={singleVideo.owner.username}
                        style={{ width: 48, height: 48, borderRadius: "50%", marginRight: 16 }}
                    />
                    <div>
                        <div style={{ fontWeight: 500 }}>{singleVideo.owner.username}</div>
                        <div style={{ color: "#606060", fontSize: 14 }}>567K subscribers</div>
                    </div>
                    <button
                        onClick={handleSubscribe}
                        style={{
                            marginLeft: 24,
                            background: singleVideo.isSubscribed ? "#e5e5e5" : "#cc0000",
                            color: singleVideo.isSubscribed ? "#000" : "#fff",
                            border: "none",
                            borderRadius: 20,
                            padding: "8px 24px",
                            fontWeight: 600,
                            cursor: "pointer"
                        }}
                    >
                        {singleVideo.isSubscribed ? "Subscribed" : "Subscribe"}
                    </button>
                </div>

                <div style={{ background: "#fff", padding: "1rem", borderRadius: "8px", marginBottom: "1rem" }}>
                    <div style={{ whiteSpace: descExpanded ? "normal" : "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {singleVideo.description}
                    </div>
                    <button
                        style={{ color: "#065fd4", background: "none", border: "none", cursor: "pointer", marginTop: 8 }}
                        onClick={() => setDescExpanded(!descExpanded)}
                    >
                        {descExpanded ? "Show less" : "Show more"}
                    </button>
                </div>

                <div style={{ background: "#fff", padding: "1rem", borderRadius: "8px" }}>
                    <h3>Comments</h3>
                    <div style={{ color: "#888" }}>No comments yet.</div>
                </div>
            </div>

            <div style={{ flex: 1 }}>
                <h4>Related Videos</h4>
                <RecommendedVideo />
            </div>
        </div>
    )
}

export default Video
