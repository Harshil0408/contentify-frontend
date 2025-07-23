import { useEffect, useRef } from "react";

interface Props {
    src: string;
    poster: string;
    watchedTime: number;
    onProgress: () => void;
}

const VideoPlayer = ({ src, poster, watchedTime, onProgress }: Props) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const setProgress = () => {
            if (watchedTime < video.duration) {
                video.currentTime = watchedTime;
            }
        };

        video.addEventListener("loadedmetadata", setProgress);
        return () => video.removeEventListener("loadedmetadata", setProgress);
    }, [watchedTime]);

    return (
        <video
            ref={videoRef}
            src={src}
            poster={poster}
            controls
            onTimeUpdate={onProgress}
            onEnded={onProgress}
            style={{ width: "100%", borderRadius: 12, background: "#000" }}
        />
    );
};

export default VideoPlayer;
