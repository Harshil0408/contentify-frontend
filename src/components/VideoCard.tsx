import React, { useRef, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import type { VideoDoc } from "@/types/types";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "@/routes";
import { formatDuration, formatViews, timeAgo } from "@/constants/function";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

interface VideoCardProps {
  video: VideoDoc;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { videoWatchProgress } = useSelector((state: RootState) => state.video)

  React.useEffect(() => {
    if (isHovered && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered]);


  return (
    <div
      className="w-[360px] flex-shrink-0 cursor-pointer"
      onClickCapture={() => navigate(`${ROUTER.VIDEO}/${video._id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-200">
        <img
          src={video.thumbnail}
          alt={video.title}
          className={`w-full h-full object-cover transition-opacity duration-200 ${isHovered ? "opacity-0" : "opacity-100"}`}
          loading="lazy"
        />
        {isHovered && (
          <video
            ref={videoRef}
            src={video.videoFile}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            autoPlay
            loop
            playsInline
            preload="none"
            poster={video.thumbnail}
          />
        )}
        {videoWatchProgress !== null && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-300">
            <div
              className="h-full bg-red-500"
              style={{
                width: `${(videoWatchProgress?.[video._id]?.watchPercentage || 0)}%`,
              }}
            />
          </div>
        )}
        <span className="absolute bottom-1.5 right-2 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded-sm">
          {formatDuration(video.duration)}
        </span>
      </div>

      <div className="flex gap-3 mt-3">
        <Avatar className="w-9 h-9 mt-1">
          <AvatarImage src={video.avatar || ""} alt={video.avatar || "U"} />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>

        <div className="flex flex-col overflow-hidden">
          <div
            className="font-medium text-[16px] text-black leading-tight line-clamp-2"
            title={video.title}
          >
            {video.title}
          </div>
          <div className="text-[14px] text-gray-700 mt-[2px] truncate">
            {video.username || "Channel Name"}
          </div>
          <div className="text-[13px] text-gray-600 mt-[2px]">
            {formatViews(video.views)} • {timeAgo(video.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
